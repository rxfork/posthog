import React from 'react'
import { Select } from 'antd'
import { useValues } from 'kea'
import { teamLogic } from 'scenes/teamLogic'
import { PropertyKeyInfo } from 'lib/components/PropertyKeyInfo'

export function EventName({ value, onChange, isActionStep = false }) {
    const { eventNamesGrouped } = useValues(teamLogic)

    return (
        <span>
            <Select
                showSearch
                allowClear
                style={{ width: '20%' }}
                onChange={onChange}
                filterOption={(input, option) => option?.value?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                disabled={isActionStep && eventNamesGrouped[0].options.length === 0}
                value={value}
                data-attr="event-name-box"
            >
                {eventNamesGrouped.map((typeGroup) => {
                    if (typeGroup.options.length > 0) {
                        return (
                            <Select.OptGroup key={typeGroup.label} label={typeGroup.label}>
                                {typeGroup.options.map((item, index) => (
                                    <Select.Option key={item.value} value={item.value} data-attr={'prop-val-' + index}>
                                        <PropertyKeyInfo value={item.label} />
                                    </Select.Option>
                                ))}
                            </Select.OptGroup>
                        )
                    }
                })}
            </Select>
            {isActionStep && (
                <>
                    <br />

                    <small>
                        {eventNamesGrouped[0].options.length === 0 && "You haven't sent any custom events."}{' '}
                        <a href="https://posthog.com/docs/integrations" target="_blank" rel="noopener noreferrer">
                            See documentation
                        </a>{' '}
                        on how to send custom events in lots of languages.
                    </small>
                </>
            )}
        </span>
    )
}
