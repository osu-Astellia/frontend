import React from 'react'
import { Avatar } from 'rsuite'

export const CountryFlag = ({ country, size }) => {
    return <Avatar src={`https://osu.gatari.pw/static/images/flags/${country}.png`} style={{ height: size ? size : 40 }} />
}
