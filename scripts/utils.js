export function shouldNotIntercept(navigationEvent) {
    return (
        navigationEvent.canIntercept === false ||
        navigationEvent.hashChange ||
        navigationEvent.downloadRequest ||
        navigationEvent.formData
    )
}

export function updateTheDOMSomehow(data) {
    document.getElementById('wrapper').innerHTML = data
}

export function findBlockDescriptionByPath(path, parent = document) {
    return parent.querySelector(`[href="${path}"] > [data-transition-name="project-description"]`)
}
export function findBlockDescriptionByPath(path, parent = document) {
    return parent.querySelector(`[href="${path}"] > [data-transition-name="card-media"]`)
}

export function findCardByPath(path, parent = document) {
    return parent.querySelector(`[href="${path}"]`)
}

export function getPersistentElement(parent = document) {
    return parent.querySelector('[data-persist="true"]')
}

export function getPersistentElementContainer(parent = document) {
    return parent.querySelector('[data-persist-container="true"]')
}
