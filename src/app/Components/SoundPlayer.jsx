"use client";

import { useState, useEffect, useRef } from "react";

export default function SoundPlayer() {
    const soundRefs = useRef({});
    const volumeSectionRef = useRef(null);  // เพิ่ม ref สำหรับส่วนวอลุ่ม
    const [volume, setVolume] = useState({
        rain: 1, ocean: 1, forest: 1, wind: 1, birds: 1, waterfall: 1, river: 1
    });
    const [isPlaying, setIsPlaying] = useState({
        rain: false, ocean: false, forest: false, wind: false, birds: false, waterfall: false, river: false
    });
    const [usedSounds, setUsedSounds] = useState([]);  // เก็บเสียงที่เคยสุ่มในรอบนั้น

    useEffect(() => {
        sounds.forEach(({ id }) => {
            soundRefs.current[id] = new Audio(`./sounds/${id}.mp3`);
        });
    }, []);

    const playPauseSound = (soundId, e) => {
        e.preventDefault();  // ป้องกันการเลื่อนหน้าจอ
        const sound = soundRefs.current[soundId];
        if (!sound) return;

        if (!sound.paused) {
            sound.pause();
            sound.currentTime = 0;
            setIsPlaying(prev => ({ ...prev, [soundId]: false }));
        } else {
            sound.volume = volume[soundId];
            sound.loop = true;
            sound.play();
            setIsPlaying(prev => ({ ...prev, [soundId]: true }));
        }

        // เลื่อนหน้าจอไปยังส่วนวอลุ่ม
        if (volumeSectionRef.current) {
            volumeSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleVolumeChange = (e, soundId) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(prevVolume => ({ ...prevVolume, [soundId]: newVolume }));
        if (soundRefs.current[soundId]) {
            soundRefs.current[soundId].volume = newVolume;
        }
    };

    const playRandomSound = (e) => {
        e.preventDefault();  // ป้องกันการเลื่อนหน้าจอ
        if (usedSounds.length === sounds.length) {
            setUsedSounds([]);
        }

        let randomSound;
        do {
            randomSound = sounds[Math.floor(Math.random() * sounds.length)];
        } while (usedSounds.includes(randomSound.id));

        playPauseSound(randomSound.id, e);
        setUsedSounds(prevUsedSounds => [...prevUsedSounds, randomSound.id]);
    };

    const resetAllSounds = (e) => {
        e.preventDefault();  // ป้องกันการเลื่อนหน้าจอ
        // หยุดเสียงทั้งหมด
        Object.keys(isPlaying).forEach(id => {
            const sound = soundRefs.current[id];
            if (sound) {
                sound.pause();
                sound.currentTime = 0;
            }
        });

        // รีเซ็ตสถานะการเล่นเสียงทั้งหมด
        setIsPlaying({
            rain: false, ocean: false, forest: false, wind: false, birds: false, waterfall: false, river: false
        });

        // รีเซ็ตปริมาณเสียงทั้งหมด
        setVolume({
            rain: 1, ocean: 1, forest: 1, wind: 1, birds: 1, waterfall: 1, river: 1
        });

        // เคลียร์รายชื่อเสียงที่เคยสุ่ม
        setUsedSounds([]);
    };

    const sounds = [
        { id: "rain", label: "🌧", color: "bg-blue-400" },
        { id: "ocean", label: "🌊", color: "bg-teal-400" },
        { id: "forest", label: "🌳", color: "bg-green-400" },
        { id: "wind", label: "🌬", color: "bg-gray-400" },
        { id: "birds", label: "🐦", color: "bg-yellow-400" },
        { id: "waterfall", label: "⛰", color: "bg-blue-500" },
        { id: "river", label: "🚣", color: "bg-blue-300" }
    ];

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-blue-200 to-blue-50 px-4 py-10">
            <h1 className="text-4xl font-bold text-gray-800 mt-10 sm:text-3xl text-center">
                Earthly Nature Sounds
            </h1>
            <p className="text-gray-600 mt-2 text-xl text-center sm:text-lg">
                "Select the sounds you want to listen to for relaxation."
            </p>

            <div className="mt-8 flex space-x-4 w-full justify-center sm:space-x-2">
                <button
                    onClick={playRandomSound}
                    className="p-4 text-white bg-gray-600 rounded-md shadow-lg transition-all hover:bg-gray-800 sm:p-3 w-1/2 sm:w-auto"
                >
                    Random Sound
                </button>

                <button
                    onClick={resetAllSounds}
                    className="p-4 text-white bg-gray-600 rounded-md shadow-lg transition-all hover:bg-gray-800 sm:p-3 w-1/2 sm:w-auto"
                >
                    Reset All
                </button>
            </div>

            {/* ปรับให้ปุ่มเสียงแถวแรกเรียง 6 ปุ่ม */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {sounds.map(({ id, label, color }) => (
                    <button 
                        key={id}
                        className={`p-8 ${isPlaying[id] ? color.replace("400", "700") : color} text-white rounded-full shadow-lg transition-all transform hover:scale-110 w-20 h-20 sm:w-24 sm:h-24`}
                        onClick={(e) => playPauseSound(id, e)}
                        aria-label={isPlaying[id] ? `หยุด${label}` : `เล่น${label}`}
                    >
                        <span className="text-3xl">{isPlaying[id] ? "⏸" : label}</span>
                    </button>
                ))}
            </div>

            <div className="mt-5 text-lg text-gray-800 flex justify-center space-x-4 sm:text-base">
                {Object.entries(isPlaying).map(([key, value]) => value && (
                    <p key={key} className="flex items-center">
                        <span className="mr-2">Playing:</span>
                        {sounds.find(s => s.id === key)?.label}
                    </p>
                ))}
            </div>

            {/* ใช้ ref เพื่อเลื่อนหน้าไปยังส่วนนี้ */}
            {Object.values(isPlaying).some(Boolean) && (
                <div ref={volumeSectionRef} className="mt-10 flex flex-wrap gap-6 justify-center">
                    {sounds.map(({ id, label }) => isPlaying[id] && (
                        <div key={id} className="border-2 border-gray-300 rounded-lg p-4 w-64 sm:w-72">
                            <label htmlFor={`${id}-volume`} className="text-gray-700">Volume {label}:</label>
                            <input 
                                id={`${id}-volume`} 
                                type="range" 
                                min="0" 
                                max="1" 
                                step="0.01" 
                                value={volume[id]} 
                                onChange={(e) => handleVolumeChange(e, id)}
                                className="mt-2 w-full h-2 bg-gray-300 rounded-lg cursor-pointer"
                            />
                            <p className="text-gray-600 mt-1">Volume: {(volume[id] * 100).toFixed(0)}%</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
