---
id: lesson-02-filtering-data
title: Filtering and Processing Noisy Sensor Data
sidebar_position: 2
---

# Filtering and Processing Noisy Sensor Data

## Learning Objectives

By the end of this lesson, you will:
- Understand sources of sensor noise and why filtering matters
- Implement simple moving average filter
- Understand trade-offs between filter responsiveness and stability
- Validate filtered data against raw sensor readings

## Prerequisites

- Lesson 1.1: Reading Temperature and Humidity Sensors (completed)
- Basic understanding of statistics (mean, average)

**Estimated Duration**: 60-75 minutes

---

## Why This Matters

Real-world sensors produce noisy data. Your DHT11 readings might jump from 22.5°C to 23.1°C to 22.7°C even though the room temperature isn't changing. AI systems need clean, stable data to make good decisions. Filtering is the technique that removes noise while preserving real changes.

---

## The Problem: Noisy Sensor Data

Look at this data stream from a DHT11 sensor in a stable room (real temperature: 22°C):

```
Reading 1:  22.1°C
Reading 2:  22.8°C  ← Jump up (noise)
Reading 3:  21.9°C  ← Jump down (noise)
Reading 4:  22.4°C
Reading 5:  23.2°C  ← Jump up (noise)
Reading 6:  22.3°C
```

The temperature isn't really changing this much! This is **sensor noise**. If your robot used these raw readings to make decisions, it might overcorrect and waste energy.

---

## Solution: Moving Average Filter

The simplest noise-filtering technique is a **moving average**. Instead of using one reading, you average the last N readings:

```
Window size = 3 readings

Readings: 22.1, 22.8, 21.9, 22.4, 23.2, 22.3
Filtered: -----, -----, 22.3, 22.4, 22.5, 22.6

Filtered[0] = (22.1 + 22.8 + 21.9) / 3 = 22.27
Filtered[1] = (22.8 + 21.9 + 22.4) / 3 = 22.37
Filtered[2] = (21.9 + 22.4 + 23.2) / 3 = 22.50
```

Much smoother!

---

## Working Code Example

### Arduino Implementation

```cpp
#include "DHT.h"

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

// Filter settings
const int FILTER_SIZE = 5; // Average last 5 readings
float tempReadings[FILTER_SIZE];
float humidityReadings[FILTER_SIZE];
int readingIndex = 0;

void setup() {
  Serial.begin(9600);
  delay(2000);
  dht.begin();

  // Initialize filter arrays with first reading
  float temp = dht.readTemperature();
  float humidity = dht.readHumidity();
  for (int i = 0; i < FILTER_SIZE; i++) {
    tempReadings[i] = temp;
    humidityReadings[i] = humidity;
  }

  Serial.println("Sensor initialized with moving average filter (size=5)");
  Serial.println("Time(s),RawTemp(C),FilteredTemp(C),RawHumidity(%),FilteredHumidity(%)");
}

void loop() {
  delay(2000);

  // Read raw sensor data
  float rawTemp = dht.readTemperature();
  float rawHumidity = dht.readHumidity();

  if (isnan(rawTemp) || isnan(rawHumidity)) {
    Serial.println("ERROR: Failed to read from DHT sensor!");
    return;
  }

  // Add new reading to filter arrays
  tempReadings[readingIndex] = rawTemp;
  humidityReadings[readingIndex] = rawHumidity;

  // Calculate averages
  float filteredTemp = 0;
  float filteredHumidity = 0;
  for (int i = 0; i < FILTER_SIZE; i++) {
    filteredTemp += tempReadings[i];
    filteredHumidity += humidityReadings[i];
  }
  filteredTemp /= FILTER_SIZE;
  filteredHumidity /= FILTER_SIZE;

  // Move to next array position
  readingIndex = (readingIndex + 1) % FILTER_SIZE;

  // Print both raw and filtered data
  static unsigned long startTime = millis();
  float elapsedSeconds = (millis() - startTime) / 1000.0;

  Serial.print(elapsedSeconds, 1);
  Serial.print(",");
  Serial.print(rawTemp, 1);
  Serial.print(",");
  Serial.print(filteredTemp, 1);
  Serial.print(",");
  Serial.print(rawHumidity, 1);
  Serial.print(",");
  Serial.println(filteredHumidity, 1);
}
```

### Python Implementation (for Raspberry Pi)

```python
import board
import adafruit_dht
import time
from collections import deque

# Initialize DHT sensor
dht_device = adafruit_dht.DHT11(board.D4)

# Filter settings
FILTER_SIZE = 5
temp_buffer = deque(maxlen=FILTER_SIZE)
humidity_buffer = deque(maxlen=FILTER_SIZE)

def get_filtered_reading():
    """Get filtered temperature and humidity"""
    try:
        # Read raw sensor
        raw_temp = dht_device.temperature
        raw_humidity = dht_device.humidity

        # Add to buffers (automatically maintains size)
        temp_buffer.append(raw_temp)
        humidity_buffer.append(raw_humidity)

        # Calculate averages
        filtered_temp = sum(temp_buffer) / len(temp_buffer)
        filtered_humidity = sum(humidity_buffer) / len(humidity_buffer)

        return raw_temp, filtered_temp, raw_humidity, filtered_humidity

    except RuntimeError as e:
        print(f"Reading error: {e}")
        return None, None, None, None

# Main loop
print("Time(s),RawTemp(C),FilteredTemp(C),RawHumidity(%),FilteredHumidity(%)")
start_time = time.time()

while True:
    elapsed = time.time() - start_time
    raw_temp, filt_temp, raw_hum, filt_hum = get_filtered_reading()

    if raw_temp is not None:
        print(f"{elapsed:.1f},{raw_temp:.1f},{filt_temp:.1f},{raw_hum:.1f},{filt_hum:.1f}")

    time.sleep(2)
```

---

## Detailed Explanation

### How Moving Average Filter Works

**Step 1: Create a buffer** to store N readings
```
readings = [22.1, 22.8, 21.9, 22.4, 23.2, ...]
```

**Step 2: New reading arrives**
- Add it to buffer
- Remove oldest reading (keep size fixed at 5)

**Step 3: Calculate average**
```
sum = 22.1 + 22.8 + 21.9 + 22.4 + 23.2 = 112.4
average = 112.4 / 5 = 22.48
```

**Step 4: Output filtered value** (22.48 instead of raw 23.2)

### Trade-offs: Size vs Response Time

**Small filter (size=3)**:
- ✅ Responds quickly to real changes
- ❌ Less noise reduction

**Large filter (size=10)**:
- ✅ Very smooth, excellent noise reduction
- ❌ Slow to respond to real temperature changes

**Recommended**: Size 5-7 for most applications

---

## Hands-On Project

### Project: Compare Raw vs Filtered Data

**Goal**: See the difference between raw and filtered readings

**Hardware Path**:
1. Upload Arduino code above
2. Open Serial Monitor (Ctrl+Shift+M, baud 9600)
3. Watch data stream for 2-3 minutes
4. Copy the CSV data
5. Paste into Excel/Google Sheets
6. Create line charts comparing raw vs filtered columns
7. Observe how filtered line is smoother!

**Optional**: Try changing `FILTER_SIZE` to 3, 5, 10 and observe impact

**Analysis Questions**:
- Which filter size responds best to real changes?
- Which provides smoothest output?
- What's the best compromise?

---

## Common Pitfalls

| Problem | Solution |
|---------|----------|
| Filtered data doesn't change | Filter too large, try smaller size |
| Still too noisy | Increase filter size |
| Slow to respond to real changes | Decrease filter size (find balance) |
| See spikes in filtered data | Normal during initialization, wait ~10 seconds |

---

## Safety First ⚠️

:::warning
- Keep sensor away from direct heat sources
- Stable room temperature provides better testing
- Wait 10+ seconds after startup before using filtered data (buffer filling)
:::

---

## Key Concepts

- **Sensor noise** is random variation in readings
- **Moving average** smooths data by averaging multiple readings
- **Filter size** controls smoothing vs responsiveness trade-off
- **Real changes** are preserved while noise is reduced
- **Filtering is essential** for AI decision-making

---

## Advanced: Exponential Moving Average

Interested in a more advanced filter? Check out exponential moving average (EMA) in further reading.

---

## Next Lesson

Ready to control physical devices? Continue to **Chapter 2: Control and Actuators** →
