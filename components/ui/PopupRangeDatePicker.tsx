'use client'

import React, { useState } from 'react'
import popupStyles from './TimePickerPopup.module.css'
import RangeDatePicker from './RangeDatePicker'

interface PopupRangeDatePickerProps {
    startName?: string
    endName?: string
    defaultStartDate?: string
    defaultEndDate?: string
    className?: string
    placeholder?: string
}

export default function PopupRangeDatePicker({
    startName = 'startDate',
    endName = 'endDate',
    defaultStartDate = '',
    defaultEndDate = '',
    className = '',
    placeholder = '日程を選択'
}: PopupRangeDatePickerProps) {
    const [startDate, setStartDate] = useState(defaultStartDate)
    const [endDate, setEndDate] = useState(defaultEndDate)
    const [showDatePicker, setShowDatePicker] = useState(false)

    // Helper to display date in Japanese format
    const formatDateDisplay = (dateStr: string) => {
        if (!dateStr) return ''
        const [y, m, d] = dateStr.split('-')
        return `${y}年${m}月${d}日`
    }

    const getDisplayValue = () => {
        if (!startDate) return ''
        const start = formatDateDisplay(startDate)
        const end = endDate ? formatDateDisplay(endDate) : ''
        return end ? `${start} - ${end}` : `${start} -`
    }

    const handleRangeChange = (start: string, end: string) => {
        setStartDate(start)
        setEndDate(end)
        if (start && end) {
            // Auto close when both dates are selected?
            // Depends on UX preference. Usually nice to auto-close.
            // Let's try auto-closing after a short delay or immediately.
            // Immediate closing might feel abrupt. 
            // Let's close immediately for now as per "one go" requirement flow.
            setShowDatePicker(false)
        }
    }

    return (
        <div className={popupStyles.timeInputContainer}>
            <input
                type="text"
                readOnly
                placeholder={placeholder}
                value={getDisplayValue()}
                onClick={() => setShowDatePicker(true)}
                className={className}
                style={{ cursor: 'pointer', textAlign: 'center' }}
            />
            {showDatePicker && (
                <>
                    <div className={popupStyles.backdrop} onClick={() => setShowDatePicker(false)} />
                    <div className={popupStyles.datePickerPopup}>
                        <RangeDatePicker
                            startDate={startDate}
                            endDate={endDate}
                            onChange={handleRangeChange}
                        />
                    </div>
                </>
            )}
            <input type="hidden" name={startName} value={startDate} />
            <input type="hidden" name={endName} value={endDate} />
        </div>
    )
}
