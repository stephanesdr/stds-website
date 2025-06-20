import {
    shouldNotIntercept,
    updateTheDOMSomehow,
    findCardByPath,
    findBlockDescriptionByPath,
    getPersistentElement,
    getPersistentElementContainer,
    findBlockCardMediaByPath,
} from './utils'

let prevPageScroll = 0

navigation.addEventListener('navigate', (navigateEvent) => {
    if (shouldNotIntercept(navigateEvent)) return

    const toUrl = new URL(navigateEvent.destination.url)
    const toPath = toUrl.pathname
    const fromPath = location.pathname

    if (location.origin !== toUrl.origin) return

    if (toPath.indexOf('/projects/') === 0) {
        return handleProjectTransition(navigateEvent, toPath, fromPath)
    } else {
        return handleHomeTransition(navigateEvent, toPath, fromPath)
    }
})

function handleProjectTransition(navigateEvent, toPath, fromPath) {
    navigateEvent.intercept({
        scroll: 'manual',
        async handler() {
            const response = await fetch(toPath)
            const data = await response.text()

            if (!document.startViewTransition) {
                updateTheDOMSomehow(data)
                document.documentElement.scrollTop = 0
                return
            }

            document
                .querySelectorAll('.card')
                .forEach((card) => card.classList.remove('with-transition'))

            document
                .querySelectorAll('[data-transition-name="project-description"]')
                .forEach((card) => card.classList.remove('with-transition'))
            
            document
                .querySelectorAll('[data-transition-name="card-media"]')
                .forEach((card) => card.classList.remove('with-transition'))

            const card = findCardByPath(toPath);
            const cardMedia = findBlockCardMediaByPath(toPath);
            const description = findBlockDescriptionByPath(toPath); 
            let persistentEl

            if (card && cardMedia && description) {
                card.classList.add('with-transition')
                cardMedia.classList.add('with-transition')
                description.classList.add('with-transition')
                persistentEl = getPersistentElement(card)
            }

            prevPageScroll = document.documentElement.scrollTop

            document.startViewTransition(() => {
                updateTheDOMSomehow(data)
                document.documentElement.scrollTop = 0

                const persistentElContainer = getPersistentElementContainer()

                if (persistentEl && persistentElContainer) persistentElContainer.replaceChildren(persistentEl)
                
            })
        },
    })
}

function handleHomeTransition(navigateEvent, toPath, fromPath) {
    navigateEvent.intercept({
        scroll: 'manual',
        async handler() {
            const response = await fetch(toPath)
            const data = await response.text()

            if (!document.startViewTransition) {
                updateTheDOMSomehow(data)
                return
            }

            const persistentEl = getPersistentElement()

            document.startViewTransition(() => {
                updateTheDOMSomehow(data)

                const card = findCardByPath(fromPath)
                const cardMedia = findBlockCardMediaByPath(fromPath)
                const description = findBlockDescriptionByPath(fromPath)

                if (card && cardMedia && description) {
                    card.classList.add('with-transition')
                    cardMedia.classList.add('with-transition')
                    description.classList.add('with-transition')

                    const persistentElContainer = getPersistentElementContainer(card)

                    if (persistentEl && persistentElContainer) persistentElContainer.replaceChildren(persistentEl)
                    
                }

                if (prevPageScroll) {
                    document.documentElement.scrollTop = prevPageScroll
                    prevPageScroll = 0;
                } 
            })
        },
    })
}
