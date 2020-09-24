// Todo: remove this.
// Any display changes really can be computed columns. And then charts just need xColumnSlug, sizeColumnSlug, yColumnSlug (or yColumnSlugs) et cetera

import { observable, computed } from "mobx"
import { trimObject } from "grapher/utils/Util"
import { DimensionProperty, Time } from "grapher/core/GrapherConstants"
import { OwidTable } from "coreTable/OwidTable"
import { LoadingColumn } from "coreTable/CoreTable"
import {
    LegacyChartDimensionInterface,
    LegacyVariableDisplayConfig,
    LegacyVariableId,
} from "coreTable/LegacyVariableCode"
import { ColumnSlug } from "coreTable/CoreTableConstants"
import {
    Persistable,
    deleteRuntimeAndUnchangedProps,
    updatePersistables,
} from "grapher/persistable/Persistable"

// A chart "dimension" represents a binding between a chart
// and a particular variable that it requests as data
class ChartDimensionDefaults implements LegacyChartDimensionInterface {
    @observable property!: DimensionProperty
    @observable variableId!: LegacyVariableId

    // check on: malaria-deaths-comparisons and computing-efficiency

    @observable display = new LegacyVariableDisplayConfig() // todo: make persistable

    // XXX move this somewhere else, it's only used for scatter x override
    @observable targetTime?: Time = undefined
}

// todo: remove when we remove dimensions
export interface LegacyDimensionsOptionsProvider {
    table: OwidTable
}

export class ChartDimension
    extends ChartDimensionDefaults
    implements Persistable {
    private options: LegacyDimensionsOptionsProvider

    constructor(
        obj: LegacyChartDimensionInterface,
        options: LegacyDimensionsOptionsProvider
    ) {
        super()
        this.options = options
        if (obj) this.updateFromObject(obj)
    }

    @computed private get table() {
        return this.options.table
    }

    updateFromObject(obj: LegacyChartDimensionInterface) {
        updatePersistables(this, obj)

        this.targetTime = obj.targetTime
        this.variableId = obj.variableId
        this.property = obj.property
    }

    toObject(): LegacyChartDimensionInterface {
        return trimObject(
            deleteRuntimeAndUnchangedProps(
                {
                    property: this.property,
                    variableId: this.variableId,
                    display: this.display,
                    targetTime: this.targetTime,
                },
                new ChartDimensionDefaults()
            )
        )
    }

    // Do not persist yet, until we migrate off VariableIds
    @observable slug?: ColumnSlug

    @computed get column() {
        return (
            this.table.get(this.columnSlug) ||
            new LoadingColumn(this.table, {
                slug: this.variableId?.toString() || "loading",
            })
        )
    }

    @computed get columnSlug() {
        return this.slug ?? this.variableId.toString()
    }
}
