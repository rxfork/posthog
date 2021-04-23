import { PersonType } from '~/types'
import React, { useMemo } from 'react'
import { PersonAvatar } from 'scenes/persons/PersonAvatar'
import './PersonHeader.scss'

export function PersonHeader({ person }: { person?: Partial<PersonType> | null }): JSX.Element {
    const customIdentifier = person?.properties
        ? person.properties.email || person.properties.name || person.properties.username
        : null

    const displayId = useMemo(() => {
        if (!person?.distinct_ids?.length) {
            return null
        }
        const baseId = person.distinct_ids[0].replace(/\W/g, '')
        return baseId.substr(baseId.length - 5).toUpperCase()
    }, [person])

    return (
        <>
            {person?.is_identified ? (
                <div className="person-header identified">
                    <span>
                        <PersonAvatar person={person} />
                    </span>
                    {customIdentifier ? (
                        <span className="ph-no-capture text-ellipsis">{customIdentifier}</span>
                    ) : (
                        <i>No email or name set</i>
                    )}
                </div>
            ) : (
                <div className="person-header anonymous">
                    <PersonAvatar person={person} />
                    Unidentified {customIdentifier || <>user {displayId}</>}
                </div>
            )}
        </>
    )
}
