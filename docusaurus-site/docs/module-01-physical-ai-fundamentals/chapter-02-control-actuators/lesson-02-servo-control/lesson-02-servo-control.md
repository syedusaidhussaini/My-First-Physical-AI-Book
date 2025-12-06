---
id: lesson-02-servo-control
title: Servo Motors and Feedback Control
sidebar_position: 2
---

# Servo Motors and Feedback Control

## Learning Objectives

By the end of this lesson, you will:
- Understand how servo motors work and PWM control signals
- Position servo motors to specific angles
- Implement feedback control (read sensor → decide action → repeat)
- Build a simple feedback control system

## Prerequisites

- Lesson 1.1: Reading Temperature and Humidity Sensors
- Lesson 2.1: Controlling DC Motors and PWM Control

**Estimated Duration**: 60-75 minutes

---

## Why This Matters

Servo motors provide **precise positioning**. Unlike DC motors that spin freely, servos hold specific angles and report their position. This enables feedback loops: read sensor → calculate desired action → move servo → verify position → repeat. This is the foundation of Physical AI!

---

## Servo vs DC Motor

| Feature | DC Motor | Servo Motor |
|---------|----------|-------------|
| **Control** | Speed | Angle (0-180°) |
| **Precision** | Rotates freely | Holds exact angle |
| **Feedback** | None (open-loop) | Position feedback |
| **Speed** | Continuous rotation | Quick response |
| **Use Case** | Wheels, fans | Robot arm, camera pan |

---

## How Servo Motors Work

### PWM Signal Encoding

Servo position is encoded in the PWM pulse width:

```
1.0ms pulse    → 0° (minimum angle)
1.5ms pulse    → 90° (center position)
2.0ms pulse    → 180° (maximum angle)

Standard servo: 50 Hz frequency (20ms period)

Position calculation:
angle = (pulse_width_ms - 1.0) / 1.0 * 180
```

### Feedback Control Loop

This is the key concept:

```
┌─────────────────────────────────────┐
│  1. Read sensor (temperature)       │
│  2. Calculate desired action        │ ← AI decision
│  3. Send command to servo           │
│  4. Servo moves to new angle        │
│  5. Read new temperature from       │   ← Back to step 1
│     servo's new position            │   (feedback!)
└─────────────────────────────────────┘
```

---

## Working Code Example

### Arduino with Servo Control

```cpp
// Servo Control with Feedback Loop
// Servo connected to Arduino Pin 9 (PWM)

#include <Servo.h>

Servo myServo;
#define SERVO_PIN 9
#define SENSOR_PIN A0   // Temperature sensor analog pin
#define MIN_ANGLE 0
#define MAX_ANGLE 180

// Feedback control variables
float targetTemp = 25.0;  // Desired temperature
float currentTemp = 22.0;

void setup() {
  Serial.begin(9600);
  myServo.attach(SERVO_PIN);

  // Start servo at center position (90°)
  myServo.write(90);

  Serial.println("Servo control initialized");
  Serial.println("Feedback loop: Read temperature → Adjust servo angle");
}

void loop() {
  // Step 1: Read current temperature from sensor
  currentTemp = readTemperature();

  // Step 2: Calculate desired servo angle based on temperature
  // More heat detected → rotate servo (e.g., open vents)
  // Less heat detected → rotate back
  int servoAngle = calculateServoAngle(currentTemp, targetTemp);

  // Step 3: Send command to servo
  myServo.write(servoAngle);

  // Step 4: Print feedback data
  Serial.print("Temp: ");
  Serial.print(currentTemp, 1);
  Serial.print("°C | Target: ");
  Serial.print(targetTemp, 1);
  Serial.print("°C | Servo: ");
  Serial.print(servoAngle);
  Serial.println("°");

  delay(1000);  // Update every 1 second
}

float readTemperature() {
  // Read from analog temperature sensor (LM35)
  // LM35: 10mV per °C
  int rawValue = analogRead(SENSOR_PIN);
  float voltage = rawValue * (5.0 / 1023.0);
  float temperature = voltage * 100.0;  // Convert to °C
  return temperature;
}

int calculateServoAngle(float current, float target) {
  // Simple proportional control
  // Difference determines servo position

  float error = target - current;  // How far from target?

  // Map error to servo angle (±50° from center)
  // Error range: -20 to +20°C
  // Servo range: 40° to 140°

  int angle = 90 + (error * 2.5);  // 2.5 multiplier for sensitivity

  // Constrain to valid range
  angle = constrain(angle, MIN_ANGLE, MAX_ANGLE);

  return angle;
}
```

### Python Feedback Control (Raspberry Pi)

```python
import RPi.GPIO as GPIO
import time
import board
import busio
import adafruit_ads1x15.analog_in as AnalogIn
from adafruit_ads1x15.analog_in import AnalogIn
import adafruit_ads1x15.ads1115 as ADS

# I2C setup for analog temperature sensor
i2c = busio.I2C(board.SCL, board.SDA)
ads = ADS.ADS1115(i2c)
channel = AnalogIn(ads, ADS.P0)

# GPIO setup for servo control
SERVO_PIN = 17
GPIO.setmode(GPIO.BCM)
GPIO.setup(SERVO_PIN, GPIO.OUT)

# PWM setup (50 Hz for servo)
pwm = GPIO.PWM(SERVO_PIN, 50)
pwm.start(0)

def angle_to_duty_cycle(angle):
    """Convert servo angle (0-180) to PWM duty cycle"""
    # 1ms = 5% duty (0°), 2ms = 10% duty (180°)
    return 5.0 + (angle / 180.0) * 5.0

def set_servo_angle(angle):
    """Move servo to specified angle (0-180)"""
    angle = max(0, min(180, angle))
    duty = angle_to_duty_cycle(angle)
    pwm.ChangeDutyCycle(duty)

def read_temperature():
    """Read temperature from analog sensor"""
    # LM35 temperature sensor
    voltage = channel.voltage
    temperature = voltage * 100  # 10mV per °C
    return temperature

def calculate_servo_angle(current_temp, target_temp):
    """Calculate desired servo angle using feedback control"""
    error = target_temp - current_temp
    angle = 90 + (error * 2.5)  # Proportional control
    return max(0, min(180, angle))

# Main feedback control loop
target_temperature = 25.0
print("Starting feedback control loop...")
print("Current Temp | Target Temp | Servo Angle | Error")

try:
    while True:
        # Step 1: Read sensor
        current_temp = read_temperature()

        # Step 2: Calculate desired action
        servo_angle = calculate_servo_angle(current_temp, target_temperature)

        # Step 3: Execute action
        set_servo_angle(servo_angle)

        # Step 4: Report feedback
        error = target_temperature - current_temp
        print(f"{current_temp:6.1f}°C    | {target_temperature:6.1f}°C    | {servo_angle:3.0f}°      | {error:+5.1f}°")

        time.sleep(1)

finally:
    pwm.stop()
    GPIO.cleanup()
```

---

## Detailed Explanation

### Servo PWM Signals

Standard servo uses 50 Hz frequency with varying pulse widths:

```
50 Hz = 20ms period

0°   position:  ┐─────┘                      1.0ms pulse
                └─────────────────────┘       20ms period

90°  position:  ┐──────────┘                  1.5ms pulse
                └──────────────────────┘      20ms period

180° position:  ┐────────────────┘            2.0ms pulse
                └────────────────────┘        20ms period
```

### Proportional Control

The feedback loop uses **proportional control**:

```
error = target - current
action = center + (error × gain)

Example:
Target: 25°C
Current: 20°C
Error: 5°C
Gain: 2.5
Servo angle: 90° + (5 × 2.5) = 102.5°
```

When temperature rises above target, servo angle decreases. When temperature falls below target, servo angle increases.

---

## Hands-On Project

### Project 1: Temperature-Controlled Vent

**Goal**: Servo opens vent when room is too hot, closes when temperature is right

**Hardware**:
- Arduino + Servo motor
- Temperature sensor (DHT11 or LM35)
- Cardboard vent flap (optional visual indicator)

**Instructions**:
1. Connect servo to Arduino pin 9
2. Connect temperature sensor to A0
3. Upload Arduino code above
4. Open Serial Monitor
5. Watch feedback loop in action!

**Test**:
- Blow warm air near sensor → servo moves
- Move sensor away from heat → servo returns to center
- Adjust `targetTemp` in code to change behavior

### Project 2: Light-Following Robot Head

**Goal**: Servo pans camera to follow light source

**Concept**: Use light sensor to track brightness

---

## Common Issues

| Problem | Solution |
|---------|----------|
| Servo twitches constantly | Noisy sensor reading, add filtering (moving average) |
| Servo only moves partially | PWM pulse timing incorrect, check `angle_to_duty_cycle` function |
| Servo doesn't respond | Check servo power supply (separate from Arduino) |
| Feedback loop oscillates | Gain too high, reduce multiplier from 2.5 to 1.0 |

---

## Safety & Constraints

:::warning Safety Requirements

- **Servo Power**: Use separate power supply (5V 2A minimum)
- **Current**: Don't power servo directly from Arduino (will reset)
- **Mechanical**: Add limit switches to prevent over-rotation
- **Torque**: Check servo torque rating for your application
- **Control Feedback**: Always verify servo position matches commands

Servo Power Wiring:
```
Servo Power → Separate 5V supply (NOT Arduino power)
Servo GND → Same GND as Arduino (common reference)
Servo Signal → Arduino PWM pin
```

:::

---

## Key Concepts

- **Servo motors** hold specific angles, providing precision over DC motors
- **PWM pulse width** encodes the desired angle (1-2ms for 0-180°)
- **Feedback control** reads sensors → calculates action → executes → repeats
- **Proportional control** generates action proportional to error
- **Separate power** is essential for reliable servo operation

---

## Advanced Topics

- **PID Control**: Beyond simple proportional (adds Integral and Derivative terms)
- **Multiple Servos**: Building multi-joint robots
- **Position Feedback**: Reading servo position from external sensors
- **Predictive Control**: AI-based anticipation instead of reactive control

---

## Next Steps

Congratulations! You've completed the **Chapter 2: Control and Actuators**!

You now understand:
- ✅ Reading sensors (Chapter 1)
- ✅ Filtering noisy data (Chapter 1)
- ✅ Controlling DC motors (Chapter 2)
- ✅ Precise servo positioning with feedback (Chapter 2)

**What's Next**:
- Build a robot arm combining multiple servos
- Create adaptive temperature control system
- Explore multi-robot coordination
- Check [Further Reading](/docs/resources/further-reading) for advanced topics

---

## Further Reading

- [Servo Motor Control Guide](https://learn.sparkfun.com/tutorials/servo-control) - More detailed servo control
- [Feedback Control Theory](https://en.wikipedia.org/wiki/Control_theory) - Understand control loops
- [PID Control Tuning](https://en.wikipedia.org/wiki/PID_controller) - Advanced proportional-integral-derivative control
- [Robot Arm Kinematics](https://en.wikipedia.org/wiki/Kinematics) - Multiple servo coordination

