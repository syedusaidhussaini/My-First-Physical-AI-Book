---
id: safety-guidelines
title: Safety Guidelines
sidebar_position: 3
---

# Safety Guidelines for Physical AI Projects

## Electrical Safety

### Voltage Levels (Safe)

✅ **Safe for beginners**:
- 3.3V (Raspberry Pi logic, some sensors)
- 5V (Arduino, USB power)
- 9V battery

⚠️ **Requires care**:
- 12V (common motor supply)
- 24V (industrial applications)

❌ **Do not use**:
- 110-240V AC wall power (lethal, requires professional)
- High current supplies without protection

### Best Practices

1. **Always verify voltage** with multimeter before connecting
2. **Never connect wrong voltage** - destroys components instantly
3. **Check power supply rating** - Arduino Uno needs 5V / 1-2A minimum
4. **Use separate power supplies** for motors (never power motor from Arduino pin)
5. **Never work on live circuits** - always disconnect power before wiring changes

---

## Motor Safety

### DC Motor Precautions

⚠️ **Safety concerns**:
- Moving parts can pinch fingers
- Can overheat if stalled (stopped against load)
- Can break if overloaded

✅ **Safe practices**:
- Keep fingers away from spinning motor
- Implement software timeout (motor auto-stops after N seconds)
- Add mechanical guards if needed
- Check current draw - if motor gets hot, reduce duty cycle

### Code Example: Motor Safety Timeout

```cpp
#define MOTOR_PIN 5
#define SAFETY_TIMEOUT 30000  // Auto-stop after 30 seconds

unsigned long motorStartTime = 0;

void runMotor(int speed) {
  analogWrite(MOTOR_PIN, speed);
  motorStartTime = millis();
}

void loop() {
  // Auto-stop safety check
  if (motorStartTime > 0 && millis() - motorStartTime > SAFETY_TIMEOUT) {
    analogWrite(MOTOR_PIN, 0);  // Stop motor
    motorStartTime = 0;
  }
}
```

### Servo Motor Precautions

⚠️ **Servo hazards**:
- Torque can pinch fingers if hand in path
- Can generate heat if held against load
- High-torque servos are stronger (more dangerous)

✅ **Safe practices**:
- Keep hands clear during servo motion
- Test servo movement slowly (use `delay()` before increasing speed)
- Use soft servo arms (reduce impact if hits something)
- Limit servo range to safe angles

---

## Power Supply Safety

### Correct Setup

```
✅ CORRECT:
┌─────────────┐
│ USB Power   │ ─┬─→ Arduino 5V
│ (5V 1A)     │  └─→ Arduino GND
└─────────────┘

Motor Power Supply:
┌─────────────┐
│ 9V Battery  │ ─┬─→ Motor Driver VCC
│ (2A)        │  └─→ Arduino GND (COMMON!)
└─────────────┘

Arduino PWM ─→ Motor Driver Signal
```

```
❌ WRONG:
┌─────────────────────┐
│ Powering motor from │  ← Will reset Arduino!
│ Arduino pin (GND)   │
└─────────────────────┘

❌ Separate GNDs ─→ No common ground = circuit doesn't work
```

### Power Supply Rules

1. **Use separate power** for motors (never from Arduino USB)
2. **Share common ground** (all GND connections together)
3. **Check current rating** - battery must supply motor current
4. **Don't share USB** with motor power (USB limits to 500mA)

---

## Sensor Safety

### Temperature Sensor Precautions

✅ **Safe practice**:
- DHT sensors operate at 3.3V or 5V
- Never exceed rated voltage
- Protect sensor from direct heat sources
- Keep away from moisture if not rated for it

❌ **Don't do**:
- Connect to 12V directly (will destroy sensor)
- Expose to extreme heat (>60°C) unless rated
- Place in water without waterproof housing

### Current Limiting

⚠️ **Critical**: Always protect circuits with current limits

```cpp
// BAD - will burn out sensor if shorted
digitalWrite(PIN, HIGH);

// GOOD - 10kΩ resistor limits current
[10kΩ Resistor] ─→ [Sensor] ─→ GND
```

---

## Fire Safety

### Thermal Runaway Prevention

Motors can overheat if:
- Stalled (stopped against resistance)
- Running at 100% duty cycle continuously
- Driver chip overheating

✅ **Prevention**:
- Implement automatic shutoff after 30-60 seconds
- Monitor battery voltage (stop if too hot)
- Use heat sinks if running large motors continuously
- Never cover motor driver with insulation

### Code: Thermal Protection

```cpp
#define MAX_DUTY 200  // Limit to 78% (vs 255 max)
#define HEAT_CHECK_INTERVAL 5000

unsigned long lastHeatCheck = 0;

void loop() {
  if (millis() - lastHeatCheck > HEAT_CHECK_INTERVAL) {
    float temp = readTemperature();
    if (temp > 50.0) {
      // Motor driver too hot - stop
      analogWrite(MOTOR_PIN, 0);
      Serial.println("ERROR: Motor driver overheating!");
    }
    lastHeatCheck = millis();
  }
}
```

---

## Chemical Safety

### Batteries

- Lithium batteries can catch fire if short-circuited
- Never carry loose coins with batteries
- Don't mix old/new batteries
- Dispose of dead batteries properly

### Solder (if soldering components)

- Solder contains lead (toxic if ingested)
- Fumes harmful - solder in ventilated area
- Wash hands after soldering

---

## Mechanical Safety

### Pinch Points

🚫 **Watch for**:
- Spinning motor shafts
- Servo arms in motion
- Gear meshes
- Rotating wheels

✅ **Prevention**:
- Remove/stop motors before touching
- Add guards around moving parts
- Keep long hair tied back
- Wear proper clothing (not loose sleeves)

---

## Chemical/Environmental Safety

### Proper Disposal

- **Electronic waste**: Recycling center (don't throw in trash)
- **Batteries**: Battery recycling program
- **Solder**: Hazardous waste disposal

### Storage

- Keep electronics dry (moisture causes shorts)
- Store batteries in cool location
- Keep away from small children/pets
- Label all power supplies with voltage

---

## Emergency Procedures

### If Fire Starts

1. **Stop power immediately** - unplug everything
2. **Don't use water** on electrical fires - use dry powder extinguisher
3. **Leave area** if fire spreads
4. **Call emergency services** if needed

### If Electrical Shock

1. **Don't touch person** if they're still in contact
2. **Break circuit** - turn off power or remove person with non-conductive object
3. **Call emergency services**

**Note**: At 5V/9V, shock risk is minimal. At 12V+, exercise caution.

### If Component Overheats

1. **Remove power immediately**
2. **Don't touch component** (let cool)
3. **Check power supply** before reapplying power
4. **Replace component** if damaged

---

## Best Practices Summary

✅ **DO**:
- [ ] Verify voltage before connecting anything
- [ ] Use separate power supplies for motors
- [ ] Share common ground between all circuits
- [ ] Implement safety timeouts (auto-stop)
- [ ] Keep workspace organized and clear
- [ ] Disconnect power before rewiring
- [ ] Wash hands after handling electronics
- [ ] Dispose of waste properly

❌ **DON'T**:
- [ ] Connect wrong voltage to components
- [ ] Power motors from Arduino pins
- [ ] Leave circuits running unattended
- [ ] Mix different battery types
- [ ] Solder in enclosed spaces
- [ ] Eat/drink near electronics workspace
- [ ] Work with wet hands
- [ ] Ignore warning signs (hot components, burning smell)

---

## Safety Checklist Before First Run

Before powering on your project:

- [ ] All connections verified with multimeter
- [ ] Correct voltage on each component
- [ ] Common ground between all circuits
- [ ] No exposed wires touching each other
- [ ] Motor has separate power supply
- [ ] Motor timeout code implemented
- [ ] No moisture on circuit boards
- [ ] All mechanical parts guarded
- [ ] Workspace clear of clutter
- [ ] Adult supervision (if under 18)

---

## More Information

- [Arduino Safety Guide](https://www.arduino.cc/en/Guide/Environment)
- [Electrical Safety Facts](https://www.osha.gov/dsg/naics-4)
- [First Aid for Electrical Injuries](https://www.redcross.org/)

**Remember**: Safety first, always!
