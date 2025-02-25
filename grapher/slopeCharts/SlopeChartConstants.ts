import { CoreColumn } from "../../coreTable/CoreTableColumns.js"
import { ChartSeries } from "../chart/ChartInterface.js"
import { ChartManager } from "../chart/ChartManager.js"
import { ScaleType } from "../core/GrapherConstants.js"
import { TextWrap } from "../text/TextWrap.js"
import { Bounds } from "../../clientUtils/Bounds.js"

export interface SlopeChartValue {
    x: number
    y: number
}

export interface SlopeChartSeries extends ChartSeries {
    size: number
    values: SlopeChartValue[]
}

export const DEFAULT_SLOPE_CHART_COLOR = "#ff7f0e"

export interface SlopeProps extends ChartSeries {
    isLayerMode: boolean
    x1: number
    y1: number
    x2: number
    y2: number
    size: number
    hasLeftLabel: boolean
    hasRightLabel: boolean
    labelFontSize: number
    leftLabelBounds: Bounds
    rightLabelBounds: Bounds
    leftValueStr: string
    rightValueStr: string
    leftLabel: TextWrap
    rightLabel: TextWrap
    isFocused: boolean
    isHovered: boolean
    leftValueWidth: number
    rightValueWidth: number
}

export interface LabelledSlopesProps {
    manager: ChartManager
    yColumn: CoreColumn
    bounds: Bounds
    seriesArr: SlopeChartSeries[]
    focusKeys: string[]
    hoverKeys: string[]
    onMouseOver: (slopeProps: SlopeProps) => void
    onMouseLeave: () => void
    onClick: () => void
}

export interface SlopeAxisProps {
    bounds: Bounds
    orient: "left" | "right"
    column: CoreColumn
    scale: any
    scaleType: ScaleType
}
