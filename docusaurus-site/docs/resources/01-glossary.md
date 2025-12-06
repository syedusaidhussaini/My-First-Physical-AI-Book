---
id: glossary
title: Glossary
sidebar_position: 1
---

# Glossary of Terms

## Hardware Terms

**Arduino**: Open-source microcontroller board popular for prototyping and education. Uses simplified C/C++ programming.

**Breadboard**: Prototyping board with holes for inserting components and jumper wires. Allows temporary circuits without soldering.

**Microcontroller**: Small computer chip that runs code. Arduino Uno has 32KB of code storage and 2KB of working memory.

**Raspberry Pi**: Full Linux computer the size of a credit card. More powerful than Arduino, can run Python easily.

**Sensor**: Device that measures physical properties (temperature, light, motion) and outputs electrical signals.

**Actuator**: Device that moves or controls physical systems (motors, servos, LEDs).

---

## Sensor Terms

**DHT11**: Temperature/humidity sensor. Budget option, good for learning.

**DHT22**: Temperature/humidity sensor. More accurate than DHT11, better for real applications.

**Pull-up Resistor**: Resistor (often 10kΩ) connected to power that keeps a signal line at HIGH when inactive. Required for DHT sensors.

**Humidity**: Amount of water vapor in air. Expressed as percentage (0-100%).

**Noise**: Random variation in sensor readings due to electrical interference or sensor limitations.

**Sampling**: Reading a sensor at specific time intervals (e.g., every 2 seconds).

---

## Electronics Terms

**Voltage**: Electrical potential difference, measured in Volts (V). Arduino operates at 5V logic.

**Current**: Flow of electrical charge, measured in Amps (A). More current = more power consumption.

**Resistance**: Opposition to current flow, measured in Ohms (Ω). Resistors limit current to protect components.

**PWM (Pulse Width Modulation)**: Rapidly switching power on/off to control speed. ON percentage = duty cycle.

**Duty Cycle**: Percentage of time a PWM signal is HIGH. 50% duty = half power.

**Ground (GND)**: Reference point for all electrical measurements. Must be common between connected devices.

---

## Motor Terms

**DC Motor**: Direct Current motor that spins continuously. Speed controlled by voltage/PWM.

**Servo Motor**: Precise positioning motor that holds specific angles. Controlled by PWM pulse width.

**H-Bridge**: Motor driver circuit that controls DC motor direction by reversing polarity.

**Motor Driver**: Electronic circuit (like L298N) that switches motor power on/off and reverses direction.

**Torque**: Rotational force of motor, measured in Newton-meters (N⋅m). Higher torque can move heavier loads.

---

## Programming Terms

**Sketch**: Arduino program file (ends in .ino). Contains `setup()` and `loop()` functions.

**Setup()**: Function that runs once when Arduino powers on. Used for initialization.

**Loop()**: Function that runs repeatedly after setup completes. Main program logic goes here.

**Variable**: Named storage location for values (e.g., `float temperature = 22.5`).

**Function**: Reusable block of code. Takes inputs (parameters) and returns output (return value).

**Library**: Pre-written code that adds functionality (e.g., DHT library for sensor reading).

**Baud Rate**: Speed of serial communication (bits per second). Common: 9600, 115200.

---

## Control Terms

**Feedback**: Information returned from a system (e.g., sensor reading confirming action completed).

**Feedback Loop**: Process of reading sensor → calculating response → executing action → repeating.

**Proportional Control**: Control action proportional to error. Larger error = larger correction.

**Setpoint**: Target value (e.g., desired temperature of 25°C).

**Error**: Difference between desired (setpoint) and actual (measured) values.

**Closed-loop**: System that reads feedback and adjusts continuously (responsive).

**Open-loop**: System that executes commands without reading feedback (not adaptive).

---

## Software Terms

**Serial Monitor**: Arduino IDE tool that displays serial communication from microcontroller.

**Serial Communication**: Text/data transfer between Arduino and computer via USB.

**IDE (Integrated Development Environment)**: Software for writing, editing, and uploading code (Arduino IDE, VS Code, etc.).

**Git**: Version control system for tracking code changes.

**Repository**: Folder containing code and version history managed by Git.

**Branch**: Separate version of code for developing features independently.

---

## Physical AI Terms

**Physical AI**: Artificial intelligence applied to robotic and IoT systems that interact with physical world.

**Robotics**: Study of robots - automated systems that sense environment and take physical action.

**IoT (Internet of Things)**: Network of connected devices that collect and share data.

**Embedded System**: Computer system built into other devices (like Arduino in a weather station).

**Real-time**: System that must respond within strict time limits (motors need immediate commands).

**Autonomous**: System that operates without human control, making its own decisions.

---

## Measurement Units

| Term | Symbol | Example |
|------|--------|---------|
| Celsius | °C | 22°C |
| Fahrenheit | °F | 72°F |
| Voltage | V | 5V |
| Current | A or mA | 500mA = 0.5A |
| Resistance | Ω | 10kΩ = 10,000Ω |
| Frequency | Hz | 50Hz = 50 cycles/second |
| Duty Cycle | % | 75% |

