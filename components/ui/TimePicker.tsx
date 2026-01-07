'use client'

import React, { useRef, useEffect } from 'react'
import styles from './IOSPicker.module.css'

interface TimePickerProps {
    value: string // "HH:mm"
    onChange: (value: string) => void
}

const ITEM_HEIGHT = 48 // 3rem = 48px usually, make sure this matches CSS

const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
const MINUTES = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

export default function TimePicker({ value, onChange }: TimePickerProps) {
    const hourRef = useRef<HTMLDivElement>(null)
    const minuteRef = useRef<HTMLDivElement>(null)

    // Derived state
    const [h = '00', m = '00'] = value ? value.split(':') : []
    const selectedHour = h
    const selectedMinute = m

    const scrollToValue = (element: HTMLDivElement | null, index: number, smooth = true) => {
        if (!element) return
        element.scrollTo({
            top: index * ITEM_HEIGHT,
            behavior: smooth ? 'smooth' : 'auto'
        })
    }

    // Sync scroll position when value changes
    useEffect(() => {
        if (!value) return

        const hIdx = parseInt(selectedHour)
        const mIdx = parseInt(selectedMinute)

        if (hourRef.current) {
            const currentScroll = hourRef.current.scrollTop
            const currentIndex = Math.round(currentScroll / ITEM_HEIGHT)
            if (currentIndex !== hIdx) {
                scrollToValue(hourRef.current, hIdx, false)
            }
        }
        if (minuteRef.current) {
            const currentScroll = minuteRef.current.scrollTop
            const currentIndex = Math.round(currentScroll / ITEM_HEIGHT)
            if (currentIndex !== mIdx) {
                scrollToValue(minuteRef.current, mIdx, false)
            }
        }
    }, [value, selectedHour, selectedMinute])

    const handleScroll = (
        e: React.UIEvent<HTMLDivElement>,
        items: string[],
        type: 'hour' | 'minute'
    ) => {
        const target = e.currentTarget
        const index = Math.round(target.scrollTop / ITEM_HEIGHT)
        const val = items[index]
        if (val) {
            if (type === 'hour') {
                if (val !== selectedHour) onChange(`${val}:${selectedMinute}`)
            } else {
                if (val !== selectedMinute) onChange(`${selectedHour}:${val}`)
            }
        }
    }

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLDivElement>,
        type: 'hour' | 'minute',
        items: string[]
    ) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault()
            const currentVal = type === 'hour' ? selectedHour : selectedMinute
            const currentIndex = items.indexOf(currentVal)
            let newIndex = currentIndex

            if (e.key === 'ArrowUp') {
                newIndex = Math.max(0, currentIndex - 1)
            } else if (e.key === 'ArrowDown') {
                newIndex = Math.min(items.length - 1, currentIndex + 1)
            }

            if (newIndex !== currentIndex) {
                const ref = type === 'hour' ? hourRef.current : minuteRef.current
                scrollToValue(ref, newIndex, true)
            }
        }
    }

    // Auto-focus the hour column when mounted to enable keyboard usage immediately
    useEffect(() => {
        if (hourRef.current) {
            hourRef.current.focus()
        }
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.highlight}></div>

            {/* Hours */}
            <div
                className={styles.column}
                ref={hourRef}
                onScroll={(e) => handleScroll(e, HOURS, 'hour')}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, 'hour', HOURS)}
                role="listbox"
                aria-label="Hour"
            >
                <div className={styles.spacer}></div>
                {HOURS.map((h, i) => (
                    <div
                        key={h}
                        className={`${styles.item} ${h === selectedHour ? styles.selected : ''}`}
                        role="option"
                        aria-selected={h === selectedHour}
                        onClick={() => scrollToValue(hourRef.current, i, true)}
                    >
                        {h}
                    </div>
                ))}
                <div className={styles.spacer}></div>
            </div>

            <div className={styles.separator}>:</div>

            {/* Minutes */}
            <div
                className={styles.column}
                ref={minuteRef}
                onScroll={(e) => handleScroll(e, MINUTES, 'minute')}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, 'minute', MINUTES)}
                role="listbox"
                aria-label="Minute"
            >
                <div className={styles.spacer}></div>
                {MINUTES.map((m, i) => (
                    <div
                        key={m}
                        className={`${styles.item} ${m === selectedMinute ? styles.selected : ''}`}
                        role="option"
                        aria-selected={m === selectedMinute}
                        onClick={() => scrollToValue(minuteRef.current, i, true)}
                    >
                        {m}
                    </div>
                ))}
                <div className={styles.spacer}></div>
            </div>
        </div>
    )
}
