package com.example.comparathor.entities;

import android.graphics.drawable.Drawable;

import com.example.comparathor.R;

public enum Icons {
    ActionCamera,
    Appliance,
    Audio,
    Battery,
    Camera,
    Connectivity,
    Console,
    CPU,
    Design,
    Dimensions,
    Display,
    Drone,
    GPU,
    Headphones,
    Laptop,
    OS,
    Other,
    Popularity,
    Price,
    RAM,
    ReleaseDate,
    Smartwatch,
    Smartphone,
    Speaker,
    Storage,
    TV,
    Tablet;

    public int getDrawableResource() {
        switch (this) {
            case ActionCamera:
                return R.drawable.ic_camera_alt_24;
            case Appliance:
                return R.drawable.ic_devices_other_24;
            case Audio:
                return R.drawable.ic_headphones_24;
            case Battery:
                return R.drawable.ic_battery_full_24;
            case Camera:
                return R.drawable.ic_camera_24;
            case Connectivity:
                return R.drawable.ic_wifi_24;
            case Console:
                return R.drawable.ic_sports_esports_24;
            case CPU:
            case GPU:
            case RAM:
                return R.drawable.ic_memory_24;
            case Design:
                return R.drawable.ic_palette_24;
            case Dimensions:
                return R.drawable.ic_straighten_24;
            case Display:
                return R.drawable.ic_monitor_24;
            case Drone:
                return R.drawable.ic_flight_24;
            case Headphones:
                return R.drawable.ic_headphones_24;
            case Laptop:
                return R.drawable.ic_laptop_24;
            case OS:
                return R.drawable.ic_display_settings_24;
            case Popularity:
                return R.drawable.ic_trending_up_24;
            case Price:
                return R.drawable.ic_attach_money_24;
            case ReleaseDate:
                return R.drawable.ic_calendar_today_24;
            case Smartwatch:
                return R.drawable.ic_watch_24;
            case Smartphone:
                return R.drawable.ic_phone_android_24;
            case Speaker:
                return R.drawable.ic_speaker_24;
            case Storage:
                return R.drawable.ic_sd_storage_24;
            case TV:
                return R.drawable.ic_tv_24;
            case Tablet:
                return R.drawable.ic_tablet_24;
            case Other:
            default:
                return R.drawable.ic_more_horiz_24;
        }
    }
}