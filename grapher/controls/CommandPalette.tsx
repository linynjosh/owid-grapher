import { BodyDiv } from "../bodyDiv/BodyDiv.js"
import { sortBy } from "../../clientUtils/Util.js"
import { observer } from "mobx-react"
import React from "react"

declare type keyboardCombo = string

export interface Command {
    combo: keyboardCombo
    fn: () => void
    title?: string
    category?: string
}

const CommandPaletteClassName = "CommandPalette"

@observer
export class CommandPalette extends React.Component<{
    commands: Command[]
    display: "none" | "block"
}> {
    static togglePalette(): void {
        const element = document.getElementsByClassName(
            CommandPaletteClassName
        )[0] as HTMLElement
        if (element)
            element.style.display =
                element.style.display === "none" ? "block" : "none"
    }

    render(): JSX.Element {
        const style: any = {
            display: this.props.display,
        }
        let lastCat = ""
        const commands = this.props.commands.filter(
            (command) => command.title && command.category
        )
        const sortedCommands = sortBy(commands, "category").map(
            (command, index) => {
                let cat = undefined
                if (command.category !== lastCat) {
                    lastCat = command.category!
                    cat = <div className="commandCategory">{lastCat}</div>
                }
                return (
                    <div key={`command${index}`}>
                        {cat}
                        <div className="commandOption">
                            <span className="commandCombo">
                                {command.combo}
                            </span>
                            <a onClick={(): void => command.fn()}>
                                {command.title}
                            </a>
                        </div>
                    </div>
                )
            }
        )

        return (
            <BodyDiv>
                <div className={CommandPaletteClassName} style={style}>
                    <div className="paletteTitle">Keyboard Shortcuts</div>
                    {sortedCommands}
                </div>
            </BodyDiv>
        )
    }
}
