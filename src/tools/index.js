const STORAGE_KEY = 'todos-vuejs'
export const todoStorage = {
  fetch: function() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    todoStorage.uid ??= +Object.keys(todos)?.slice(-1)[0] + 1 || 0
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  },
}

export function getTitle(vm) {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function' ? title.call(vm) : title
  }
}
