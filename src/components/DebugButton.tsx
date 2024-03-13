import { debug } from "@stores/AppStore";
import { useStore } from "@nanostores/react";
import { cn } from "@utils/cn";
import { computed } from "nanostores";

const $isDebug = computed(debug, debug => {
    return debug == '0' ? false : true
})

export default function DebugButton() {
    const $debug = useStore($isDebug)

    return <button type="button" className={
        cn(
            'text-white uppercase font-light p-1 text-xs rounded fixed z-50 top-1 right-1 cursor-pointer',
            !$debug ? 'bg-blue-500 hover:bg-blue-700' : '',
            $debug ? 'bg-gray-500 hover:bg-gray-700' : ''
        )
    } onClick={(e) => {
        debug.set($debug ? '0' : '1')
    }}>{$debug ? 'Debug Off' : 'debug On'}</button>
}