import React from "react"
import { SlopeChart } from "./SlopeChart.js"
import {
    SampleColumnSlugs,
    SynthesizeGDPTable,
} from "../../coreTable/OwidTableSynthesizers.js"
import { BlankOwidTable } from "../../coreTable/OwidTable.js"

export default {
    title: "SlopeChart",
    component: SlopeChart,
}

const table = SynthesizeGDPTable({ entityCount: 10 })

export const Default = () => {
    return (
        <svg width={600} height={600}>
            <SlopeChart manager={{ table }} />
        </svg>
    )
}

export const WithColorColumn = () => {
    return (
        <svg width={600} height={600}>
            <SlopeChart
                manager={{
                    table,
                    colorColumnSlug: SampleColumnSlugs.Population,
                    yColumnSlug: SampleColumnSlugs.GDP,
                }}
            />
        </svg>
    )
}

export const BlankSlopeChart = () => {
    return (
        <svg width={600} height={600}>
            <SlopeChart
                manager={{
                    table: BlankOwidTable(),
                }}
            />
        </svg>
    )
}
