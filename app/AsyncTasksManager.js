var gdjs;

(function (i) {
    class l {
        constructor() {
            this.tasksWithCallback = new Array();
        }

        processTasks(e) {
            for (let s = 0; s < this.tasksWithCallback.length; s++) {
                const r = this.tasksWithCallback[s];
                if (r.asyncTask.update(e)) {
                    r.callback(e);
                    this.tasksWithCallback.splice(s--, 1);
                }
            }
        }

        addTask(e, s) {
            this.tasksWithCallback.push({
                asyncTask: e,
                callback: s
            });
        }

        clearTasks() {
            this.tasksWithCallback.length = 0;
        }
    }

    i.AsyncTasksManager = l;

    class t {}

    i.AsyncTask = t;

    class o extends t {
        constructor() {
            super(...arguments);
            this.tasks = new Array();
        }

        addTask(e) {
            this.tasks.push(e);
        }

        update(e) {
            for (let s = 0; s < this.tasks.length; s++) {
                if (this.tasks[s].update(e)) {
                    this.tasks.splice(s--, 1);
                }
            }
            return this.tasks.length === 0;
        }
    }

    i.TaskGroup = o;

    class c extends t {
        update() {
            return true;
        }
    }

    i.ResolveTask = c;

    const n = new i.Logger("Internal PromiseTask");

    class h extends t {
        constructor(e) {
            super();
            this.isResolved = false;
            this.promise = e.catch(s => {
                n.error(`A promise error has not been handled, this should never happen!
If you are using JavaScript promises in an asynchronous action, make sure to add a .catch().
Otherwise, report this as a bug on the GDevelop forums!
${s ? "The following error was thrown: " + s : ""}`);
            }).then(s => {
                this.isResolved = true;
                return s;
            });
        }

        update() {
            return this.isResolved;
        }
    }

    i.PromiseTask = h;

    class k extends t {
        constructor() {
            super(...arguments);
            this.isResolved = false;
        }

        resolve() {
            this.isResolved = true;
        }

        update() {
            return this.isResolved;
        }
    }

    i.ManuallyResolvableTask = k;
})(gdjs || (gdjs = {}));

//# sourceMappingURL=AsyncTasksManager.js.map
