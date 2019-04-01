/**
 *
 * The `react$$` command is a useful command to query multiple React Components
 * by their actual name and filter them by props and state.
 *
 * <example>
    :pause.js
    it('should calculate 7 * 6', () => {
        browser.url('https://ahfarmer.github.io/calculator/');

        browser.react$('t', { name: '7' }).click()
        browser.react$('t', { name: 'x' }).click()
        browser.react$('t', { name: '6' }).click()
        browser.react$('t', { name: '=' }).click()

        console.log($('.component-display').getText()); // prints "42"
    });
 * </example>
 *
 * @alias browser.react$
 * @param {Object=} props  React props the element should contain
 * @param {Object=} state  React state the element should be in
 * @return {Element}
 *
 */
import fs from 'fs'
import { getElements } from '../../utils/getElementObject'
import { waitToLoadReact, react$$ as react$$Script } from '../../scripts/resq'

const resqScript = fs.readFileSync(require.resolve('resq'))

export default async function react$ (selector, props = {}, state = {}) {
    await this.executeScript(resqScript.toString().slice(45), [])
    await this.execute(waitToLoadReact)
    const res = await this.execute(react$$Script, selector, props, state)
    return getElements.call(this, selector, res)
}
