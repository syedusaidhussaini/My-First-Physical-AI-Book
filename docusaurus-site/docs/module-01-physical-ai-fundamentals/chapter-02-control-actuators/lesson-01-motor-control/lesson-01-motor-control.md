---
id: lesson-01-motor-control
title: Controlling DC Motors and PWM Control
sidebar_position: 1
---

# Controlling DC Motors and PWM Control

## Learning Objectives

By the end of this lesson, you will:
- Understand PWM (Pulse Width Modulation) and duty cycle concepts
- Control DC motor speed using PWM
- Reverse motor direction with H-bridge motor driver
- Implement safety limits to prevent hardware damage

## Prerequisites

- Lesson 1.1: Reading Temperature and Humidity Sensors
- Basic understanding of digital signals and voltage levels

**Estimated Duration**: 60-75 minutes

---

## Why This Matters

Reading sensors is half the story. Now you'll learn to make physical systems respond. DC motors power robots, fans, pumps, and countless devices. Controlling their speed and direction is essential for Physical AI applications.

---

## The Challenge: PWM (Pulse Width Modulation)

A digital pin is either ON (5V) or OFF (0V). How do you control motor speed?

**Answer**: Rapidly switch the pin on and off! By changing how long it stays ON vs OFF, you control power:

```
100% power (always ON):
─────────────────────  (HIGH)
───────────────────── (1.0 = full speed)

50% power:
─┐   ┐   ┐   ┐   ┐     (HIGH)
 └───┘   └───┘   └─   (0.5 = half speed)

25% power:
─┐   ┐   ┐   ┐   ┐     (HIGH)
 └─┘ └─┘ └─┘ └─┘ └     (0.25 = quarter speed)
```

The ratio is called **duty cycle**: ON_time / (ON_time + OFF_time)

---

## Working Code Example

### Arduino with Motor Control

```cpp
// DC Motor Control with PWM
// Motor connected to:
//   - Motor Pin 1 → Arduino Pin 5 (PWM)
//   - Motor Pin 2 → Arduino Pin 6 (PWM)
//   - GND → Arduino GND
//   - Motor power → External 5V or 9V supply

#define MOTOR_PIN1 5    // PWM pin for direction control
#define MOTOR_PIN2 6    // PWM pin for reverse direction
#define MAX_SPEED 255   // Maximum PWM value (0-255)
#define SAFETY_TIMEOUT 30000  // Stop motor after 30 seconds (safety)

unsigned long motorStartTime = 0;

void setup() {
  Serial.begin(9600);
  pinMode(MOTOR_PIN1, OUTPUT);
  pinMode(MOTOR_PIN2, OUTPUT);

  // Ensure motor starts stopped
  analogWrite(MOTOR_PIN1, 0);
  analogWrite(MOTOR_PIN2, 0);

  Serial.println("Motor Control initialized");
  Serial.println("Commands: f <speed>, r <speed>, s (stop)");
  Serial.println("Speed: 0-255 (0=stopped, 255=full speed)");
}

void loop() {
  // Safety check: stop motor if running too long
  if (motorStartTime > 0 && millis() - motorStartTime > SAFETY_TIMEOUT) {
    stopMotor();
    motorStartTime = 0;
    Serial.println("SAFETY: Motor stopped (30 second timeout)");
  }

  // Listen for commands from Serial Monitor
  if (Serial.available()) {
    String command = Serial.readStringUntil('\n');
    command.trim();

    if (command.startsWith("f")) {
      // Forward: "f 200"
      int speed = command.substring(2).toInt();
      setMotorForward(speed);
    }
    else if (command.startsWith("r")) {
      // Reverse: "r 150"
      int speed = command.substring(2).toInt();
      setMotorReverse(speed);
    }
    else if (command == "s") {
      stopMotor();
    }
    else {
      Serial.println("Unknown command");
    }
  }
}

void setMotorForward(int speed) {
  speed = constrain(speed, 0, MAX_SPEED);

  analogWrite(MOTOR_PIN1, speed);
  analogWrite(MOTOR_PIN2, 0);

  motorStartTime = millis();
  Serial.print("Motor forward at ");
  Serial.print(speed);
  Serial.println("/255 speed");
}

void setMotorReverse(int speed) {
  speed = constrain(speed, 0, MAX_SPEED);

  analogWrite(MOTOR_PIN1, 0);
  analogWrite(MOTOR_PIN2, speed);

  motorStartTime = millis();
  Serial.print("Motor reverse at ");
  Serial.print(speed);
  Serial.println("/255 speed");
}

void stopMotor() {
  analogWrite(MOTOR_PIN1, 0);
  analogWrite(MOTOR_PIN2, 0);
  motorStartTime = 0;
  Serial.println("Motor stopped");
}
```

### Python Implementation (Raspberry Pi)

```python
import RPi.GPIO as GPIO
import time

# GPIO pins (adjust to your setup)
MOTOR_PIN1 = 17
MOTOR_PIN2 = 27
PWM_FREQ = 1000  # Frequency in Hz

GPIO.setmode(GPIO.BCM)
GPIO.setup(MOTOR_PIN1, GPIO.OUT)
GPIO.setup(MOTOR_PIN2, GPIO.OUT)

# Setup PWM
pwm1 = GPIO.PWM(MOTOR_PIN1, PWM_FREQ)
pwm2 = GPIO.PWM(MOTOR_PIN2, PWM_FREQ)
pwm1.start(0)
pwm2.start(0)

def set_motor_speed(speed, direction='forward'):
    """
    Control motor speed and direction
    speed: 0-100 (percentage)
    direction: 'forward' or 'reverse'
    """
    speed = max(0, min(100, speed))  # Constrain to 0-100

    if direction == 'forward':
        pwm1.ChangeDutyCycle(speed)
        pwm2.ChangeDutyCycle(0)
    elif direction == 'reverse':
        pwm1.ChangeDutyCycle(0)
        pwm2.ChangeDutyCycle(speed)
    else:
        pwm1.ChangeDutyCycle(0)
        pwm2.ChangeDutyCycle(0)

    print(f"Motor {direction} at {speed}%")

def stop_motor():
    pwm1.ChangeDutyCycle(0)
    pwm2.ChangeDutyCycle(0)
    print("Motor stopped")

# Test sequence
try:
    print("Testing motor speed control...")

    for speed in [25, 50, 75, 100]:
        set_motor_speed(speed, 'forward')
        time.sleep(2)

    stop_motor()
    time.sleep(1)

    for speed in [50, 100]:
        set_motor_speed(speed, 'reverse')
        time.sleep(2)

    stop_motor()

finally:
    pwm1.stop()
    pwm2.stop()
    GPIO.cleanup()
```

---

## Detailed Explanation

### PWM Frequency and Duty Cycle

**PWM Frequency**: How fast the switching happens (typically 1-5 kHz for motors)
- Higher frequency = smoother operation
- Arduino defaults to ~490 Hz on pins 5,6

**Duty Cycle**: Percentage of time the pin is HIGH
- 0% = 0V (stopped)
- 50% = average 2.5V (half speed)
- 100% = 5V (full speed)

### Motor Direction with H-Bridge

To reverse direction, you need an **H-bridge** driver chip (like L298N):

```
Forward:  PIN1=HIGH, PIN2=LOW  → Motor spins forward
Reverse:  PIN1=LOW, PIN2=HIGH → Motor spins backward
Stopped:  PIN1=LOW, PIN2=LOW  → Motor stopped
```

---

## Hands-On Project

### Project: Motor Speed Controller

**Goal**: Build an interactive motor controller

**Hardware Requirements**:
- Arduino + Motor driver (L298N or similar)
- DC motor (3-6V rated)
- External power supply (5V or 9V)
- Jumper wires

**Assembly**:
1. Connect motor pins to driver
2. Connect driver pins 1,2 to Arduino pins 5,6
3. Connect power supply to motor driver

**Instructions**:
1. Upload Arduino code above
2. Open Serial Monitor (Ctrl+Shift+M, baud 9600)
3. Type commands:
   - `f 100` → Motor forward at speed 100
   - `r 150` → Motor reverse at speed 150
   - `s` → Stop motor

**Experiments**:
- Try different speeds: `f 50`, `f 100`, `f 255`
- Reverse direction: `r 100`
- Time how long motor runs (safety timeout = 30 seconds)

---

## Safety & Constraints

:::warning Safety Requirements

- **Voltage Check**: Verify motor rating matches power supply (3V, 5V, 9V, 12V)
- **Current Limit**: Motor driver must handle motor current (typically 0.5-2A)
- **Timeout**: Always implement automatic shutdown (30 seconds in code above)
- **Emergency Stop**: Comment out timeout ONLY if you have physical e-stop button
- **No Stalling**: If motor resistance increases suddenly, it can overheat

Safety Example (Automatic Shutdown):
```cpp
// Motor auto-stops after 30 seconds
if (millis() - motorStartTime > 30000) {
  stopMotor();
}
```

:::

---

## Common Issues

| Problem | Solution |
|---------|----------|
| Motor won't spin | Check power supply, verify motor driver connections |
| Motor only goes forward | Check reverse pin connection |
| Motor jumps to full speed | Noise on analog pin, add capacitor filter |
| Motor gets hot | Check current draw, reduce duty cycle |

---

## Key Concepts

- **PWM** rapidly switches power on/off to control speed
- **Duty cycle** is percentage of time power is ON
- **H-bridge** reverses motor direction
- **Safety timeout** prevents runaway motors
- **Current limiting** protects equipment

---

## Next Lesson

Ready for precise servo control? Continue to **Lesson 2.2: Servo Motors and Feedback Control** →
