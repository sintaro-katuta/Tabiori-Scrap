'use client'

import React, { useState } from 'react'
import popupStyles from './TimePickerPopup.module.css'
import DatePicker from './DatePicker'

interface PopupDatePickerProps {
    name: string
    defaultValue?: string
    className?: string
    placeholder?: string
}

export default function PopupDatePicker({
    name,
    defaultValue = '',
    className = '',
    placeholder = '日付を選択'
}: PopupDatePickerProps) {
    const [dateValue, setDateValue] = useState(defaultValue)
    const [showDatePicker, setShowDatePicker] = useState(false)

    // Helper to display date in Japanese format
    const formatDateDisplay = (dateStr: string) => {
        if (!dateStr) return ''
        const [y, m, d] = dateStr.split('-')
        return `${y}年${m}月${d}日`
    }

    return (
        <div className={popupStyles.timeInputContainer}>
            <input
                type="text"
                readOnly
                placeholder={placeholder}
                value={formatDateDisplay(dateValue)}
                onClick={() => setShowDatePicker(true)}
                className={className}
                style={{ cursor: 'pointer', textAlign: 'center' }}
            />
            {showDatePicker && (
                <>
                    <div className={popupStyles.backdrop} onClick={() => setShowDatePicker(false)} />
                    <div className={popupStyles.datePickerPopup}>
                        <DatePicker
                            value={dateValue}
                            onChange={(val) => {
                                setDateValue(val)
                                setShowDatePicker(false) // Auto close on selection? Optional, but typical for date pickers
                            }}
                        />
                    </div>
                </>
            )}
            <input type="hidden" name={name} value={dateValue} />
        </div>
    )
}
