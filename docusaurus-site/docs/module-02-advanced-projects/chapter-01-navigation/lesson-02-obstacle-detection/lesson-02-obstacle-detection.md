---
id: lesson-02-obstacle-detection
title: Obstacle Detection and Avoidance
sidebar_position: 2
---

# Obstacle Detection and Avoidance

## Learning Objectives

By the end of this lesson, you will:
- Use ultrasonic and IR sensors for obstacle detection
- Implement real-time collision avoidance
- Build reactive control systems (fast response)
- Combine sensor fusion for robust detection
- Deploy dynamic obstacle avoidance algorithms

## Prerequisites

- Lesson 2.1: Robot Navigation and Path Planning

**Estimated Duration**: 75-90 minutes

---

## Why This Matters

A robot that follows a pre-planned path but can't detect obstacles is dangerous!

**Real-world scenarios:**
- Moving obstacles (people, animals)
- Unmapped obstacles (doors, furniture)
- Sensor failures or blind spots

We need **reactive control** that responds immediately.

---

## Obstacle Detection Sensors

### Ultrasonic Sensor (HC-SR04)

**How it works:**
1. Send 10µs pulse on TRIG pin
2. Sensor emits 40kHz sound
3. Sound bounces off object
4. Measure ECHO pulse width
5. Distance = (pulse_width × speed_of_sound) / 2

```cpp
// Arduino HC-SR04 Connection
TRIG → Pin 5
ECHO → Pin 6
GND → GND
VCC → 5V

// Distance calculation:
Distance (cm) = pulse_width (µs) / 58
Distance (cm) = pulse_width (µs) / 29 (one way)
```

**Range:** 2cm - 400cm
**Accuracy:** ±3cm
**Advantages:** Long range, cheap, reliable
**Disadvantages:** Slow (40ms per reading), narrow cone

### IR Proximity Sensor

**How it works:**
1. IR LED emits infrared light
2. Reflected light detected by photodiode
3. Closer object = stronger signal

```cpp
// IR Sensor Connection
Signal → Analog Input A0
GND → GND
VCC → 5V

// Reading IR sensor
int distance = analogRead(A0);  // 0-1023
// 0 = no object (far)
// 1023 = very close object
```

**Range:** 4cm - 30cm
**Speed:** ~10ms
**Advantages:** Fast, compact, good for close range
**Disadvantages:** Short range, affected by surface color

---

## Real-Time Obstacle Avoidance

### Arduino Implementation

```cpp
#include <NewPing.h>

// Ultrasonic Sensor
#define TRIG_PIN 5
#define ECHO_PIN 6
#define MAX_DISTANCE 200  // cm

// Motor Pins
#define LEFT_PWM 9
#define LEFT_DIR 8
#define RIGHT_PWM 10
#define RIGHT_DIR 11

// IR Sensor
#define IR_PIN A0

NewPing sonar(TRIG_PIN, ECHO_PIN, MAX_DISTANCE);

// Thresholds
#define DANGER_DISTANCE 20   // cm - STOP immediately
#define CAUTION_DISTANCE 40  // cm - Slow down
#define SAFE_DISTANCE 100    // cm - Normal speed

void setMotor(int pwm_pin, int dir_pin, int speed) {
  // speed: -255 (full reverse) to 255 (full forward)
  if (speed >= 0) {
    digitalWrite(dir_pin, HIGH);
    analogWrite(pwm_pin, min(speed, 255));
  } else {
    digitalWrite(dir_pin, LOW);
    analogWrite(pwm_pin, min(-speed, 255));
  }
}

int getDistance() {
  // Returns distance in cm
  return sonar.ping_cm();
}

int getIRDistance() {
  // Returns raw IR reading (0-1023)
  return analogRead(IR_PIN);
}

void avoidObstacle() {
  int distance = getDistance();
  int ir_value = getIRDistance();

  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.print("cm, IR: ");
  Serial.println(ir_value);

  // Priority: Check IR first (very close, immediate threat)
  if (ir_value > 800) {
    // Immediate danger: very close object
    Serial.println("🚫 EMERGENCY STOP");
    setMotor(LEFT_PWM, LEFT_DIR, 0);
    setMotor(RIGHT_PWM, RIGHT_DIR, 0);
    delay(500);

    // Backup and turn
    setMotor(LEFT_PWM, LEFT_DIR, -100);  // Reverse
    setMotor(RIGHT_PWM, RIGHT_DIR, -100);
    delay(300);

    // Turn right
    setMotor(LEFT_PWM, LEFT_DIR, 100);   // Forward left
    setMotor(RIGHT_PWM, RIGHT_DIR, -50); // Slow right
    delay(500);

    return;
  }

  // Check ultrasonic sensor
  if (distance == 0) {
    // Sensor error/no echo - be cautious
    setMotor(LEFT_PWM, LEFT_DIR, 50);
    setMotor(RIGHT_PWM, RIGHT_DIR, 50);
    return;
  }

  if (distance < DANGER_DISTANCE) {
    // Emergency stop
    Serial.println("⚠️  DANGER - Stopping");
    setMotor(LEFT_PWM, LEFT_DIR, 0);
    setMotor(RIGHT_PWM, RIGHT_DIR, 0);
    delay(300);

    // Backup and turn random direction
    setMotor(LEFT_PWM, LEFT_DIR, -80);
    setMotor(RIGHT_PWM, RIGHT_DIR, -80);
    delay(200);

    // Random turn
    if (random(2) == 0) {
      // Turn left
      setMotor(LEFT_PWM, LEFT_DIR, -50);
      setMotor(RIGHT_PWM, RIGHT_DIR, 100);
    } else {
      // Turn right
      setMotor(LEFT_PWM, LEFT_DIR, 100);
      setMotor(RIGHT_PWM, RIGHT_DIR, -50);
    }
    delay(400);

  } else if (distance < CAUTION_DISTANCE) {
    // Slow down
    Serial.println("⚠️  Caution - Slowing down");
    setMotor(LEFT_PWM, LEFT_DIR, 100);
    setMotor(RIGHT_PWM, RIGHT_DIR, 100);

  } else {
    // Safe to move normally
    Serial.println("✓ Safe - Moving forward");
    setMotor(LEFT_PWM, LEFT_DIR, 150);
    setMotor(RIGHT_PWM, RIGHT_DIR, 150);
  }
}

void setup() {
  Serial.begin(115200);

  pinMode(LEFT_PWM, OUTPUT);
  pinMode(LEFT_DIR, OUTPUT);
  pinMode(RIGHT_PWM, OUTPUT);
  pinMode(RIGHT_DIR, OUTPUT);

  Serial.println("Obstacle Avoidance Robot Ready!");
}

void loop() {
  avoidObstacle();
  delay(100);  // Check every 100ms
}
```

### Python Raspberry Pi Version

```python
import RPi.GPIO as GPIO
import time
from enum import Enum

class ObstacleAvoidanceRobot:
    def __init__(self, left_pin=17, right_pin=23,
                 trig_pin=27, echo_pin=22,
                 ir_pin=None):
        self.left_pin = left_pin
        self.right_pin = right_pin
        self.trig_pin = trig_pin
        self.echo_pin = echo_pin

        # Distance thresholds (cm)
        self.danger_distance = 20
        self.caution_distance = 40
        self.safe_distance = 100

        # Setup GPIO
        GPIO.setmode(GPIO.BCM)
        GPIO.setup([left_pin, right_pin, trig_pin, echo_pin], GPIO.OUT)
        GPIO.setup(echo_pin, GPIO.IN)

        self.left_pwm = GPIO.PWM(left_pin, 1000)
        self.right_pwm = GPIO.PWM(right_pin, 1000)
        self.left_pwm.start(0)
        self.right_pwm.start(0)

        print("✓ Obstacle Avoidance Robot Initialized")

    def get_distance(self):
        """Measure distance using HC-SR04 ultrasonic sensor"""
        # Send trigger pulse
        GPIO.output(self.trig_pin, GPIO.HIGH)
        time.sleep(0.00001)  # 10µs
        GPIO.output(self.trig_pin, GPIO.LOW)

        # Wait for echo pulse
        timeout = time.time()
        while GPIO.input(self.echo_pin) == 0:
            pulse_start = time.time()
            if pulse_start - timeout > 0.1:
                return 0  # Timeout

        timeout = time.time()
        while GPIO.input(self.echo_pin) == 1:
            pulse_end = time.time()
            if pulse_end - timeout > 0.1:
                return 0  # Timeout

        # Calculate distance
        pulse_duration = pulse_end - pulse_start
        distance = pulse_duration * 17150  # cm
        distance = round(distance, 2)

        return distance

    def set_motor(self, pwm, speed):
        """
        Set motor speed
        speed: -100 (full reverse) to 100 (full forward)
        """
        speed = max(-100, min(100, speed))
        pwm.ChangeDutyCycle(abs(speed))

        # Direction control (simplified - assume direction pin connected)
        # In real implementation, would need separate direction pins

    def avoid_obstacles(self):
        """Main obstacle avoidance loop"""
        print("Starting obstacle avoidance...")

        try:
            while True:
                distance = self.get_distance()

                print(f"Distance: {distance}cm", end=" → ")

                if distance == 0:
                    print("Sensor error!")
                    self.set_motor(self.left_pwm, 10)
                    self.set_motor(self.right_pwm, 10)

                elif distance < self.danger_distance:
                    print("🚫 DANGER - Emergency stop!")
                    self.set_motor(self.left_pwm, 0)
                    self.set_motor(self.right_pwm, 0)
                    time.sleep(0.3)

                    # Backup
                    self.set_motor(self.left_pwm, -30)
                    self.set_motor(self.right_pwm, -30)
                    time.sleep(0.2)

                    # Turn right
                    self.set_motor(self.left_pwm, 30)
                    self.set_motor(self.right_pwm, -30)
                    time.sleep(0.4)

                elif distance < self.caution_distance:
                    print("⚠️  CAUTION - Slowing down")
                    self.set_motor(self.left_pwm, 40)
                    self.set_motor(self.right_pwm, 40)

                else:
                    print("✓ SAFE - Moving forward")
                    self.set_motor(self.left_pwm, 60)
                    self.set_motor(self.right_pwm, 60)

                time.sleep(0.1)

        except KeyboardInterrupt:
            print("\nStopping...")
        finally:
            self.cleanup()

    def cleanup(self):
        """Clean up GPIO"""
        self.left_pwm.stop()
        self.right_pwm.stop()
        GPIO.cleanup()
        print("✓ Cleanup complete")

# Example usage
if __name__ == "__main__":
    robot = ObstacleAvoidanceRobot()
    robot.avoid_obstacles()
```

---

## Sensor Fusion: Combining Multiple Sensors

**Why combine sensors?**
- Ultrasonic: Long range but slow
- IR: Short range but fast
- Together: Complete coverage with speed

```cpp
// Sensor Fusion Strategy
if (ir_very_close) {
  // Immediate danger detected
  stop_immediately();
} else if (ultrasonic_far && time_since_last_check > 100ms) {
  // Safe, but re-check frequently
  move_forward();
} else if (ultrasonic_close) {
  // Something approaching
  slow_down();
  turn_away();
}
```

---

## Common Issues

| Problem | Cause | Solution |
|---------|-------|----------|
| Oscillates (forward/back) | Threshold too close to sensor noise | Increase CAUTION_DISTANCE |
| Doesn't detect obstacles | Sensor misaligned | Check sensor mounting, test manually |
| False positives | Reflective surfaces | Add hysteresis (e.g., 30cm vs 35cm) |
| Too slow | Excessive delay() calls | Use interrupts or millis-based timing |

---

## What's Next

- Multi-sensor array (scan left/right)
- SLAM with mapping
- Predictive path planning
- Check [Further Reading](/docs/resources/further-reading) for advanced techniques

