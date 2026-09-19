---
layout: default
title: Samsung Devices
permalink: /samsung/
---

<h2>Samsung Devices</h2>
<p>Select your supported device below:</p>

<div class="devices-grid">
    <!-- Collapsible Device Card 1 -->
    <div class="device-card" id="card-a23">
        <div class="device-card-header" onclick="toggleCard('card-a23')">
            <h3>Samsung Galaxy A23 5G</h3>
            <span class="arrow-icon">&#9660;</span>
        </div>
        <div class="device-card-content">
            <p>Codename: a23xq</p>
            <a href="{{ '/samsung/a23xq/' | relative_url }}" class="device-btn">Click here to download AOSP ROMs</a>
        </div>
    </div>

    <!-- Collapsible Device Card 2 -->
    <div class="device-card" id="card-a71">
        <div class="device-card-header" onclick="toggleCard('card-a71')">
            <h3>Samsung Galaxy A71</h3>
            <span class="arrow-icon">&#9660;</span>
        </div>
        <div class="device-card-content">
            <p>Codename: a71</p>
            <a href="{{ '/samsung/a71/' | relative_url }}" class="device-btn">Click here to download AOSP ROMs</a>
        </div>
    </div>
</div>
