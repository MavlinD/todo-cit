import { getTitle, todoStorage } from 'src/tools'

export default {
  created() {
    const title = getTitle(this)
    if (title) {
      document.title = title
    }
  },

  data: function() {
    return {
      notes: todoStorage.fetch(),
      redoLog: new Map(),
      undoLog: new Map(),
      undoId: 0,
      redoId: 0,
    }
  },
  methods: {
    // setter of listeners for child component
    setListeners(listeners = {}) {
      return { ...this.$listeners, ...listeners }
    },
    delete_note(id) {
      const copyNotes = { ...this.notes }
      delete copyNotes[id]
      this.notes = Object.assign({}, copyNotes)
    },
    save_note(value) {
      const title = value && value.trim()
      if (!value) return
      this.$set(this.notes, todoStorage.uid++, { title })
    },
    async go_to_home() {
      await this.$nextTick()
      await this.$router.push({ name: 'notes' })
    },
  },
  watch: {
    notes: {
      handler: function(notes) {
        todoStorage.save(notes)
      },
      deep: true,
    },
  },
  computed: {
    form_listeners(vm) {
      return this.setListeners({
        async cancel() {
          if (vm.undoLog.size) {
            vm.notes = JSON.parse(vm.undoLog.get(0))
            await vm.go_to_home()
            return
          }
          await vm.go_to_home()
        },

        redo() {
          vm.redoId--
          if (vm.redoLog.size === 1) {
            vm.undoId++
            return
          }
          vm.undoLog.set(vm.undoId++, vm.redoLog.get(vm.redoId))
        },
        undo() {
          vm.undoId--
          if (vm.undoLog.size === 1) {
            vm.redoLog.set(vm.redoId++, JSON.stringify(vm.notes))
            return
          }
          vm.redoLog.set(vm.redoId++, vm.undoLog.get(vm.undoId))
        },

        async this_delete_note() {
          vm.delete_note(vm.id)
          await vm.go_to_home()
        },

        create(arg) {
          vm.save_note(arg)
        },
        update(arg) {
          if (!arg) {
            vm.delete_note(vm.id)
            return
          }
          vm.undoLog.set(vm.undoId++, JSON.stringify(vm.notes))
          vm.notes[vm.id].title = arg.trim()
        },
      })
    },
  },
}
