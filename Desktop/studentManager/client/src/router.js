import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/login",
            name: "login",
            component: () =>
                import ("./views/admin/Login.vue")
        },
        {
            path: "/admin",
            name: "admin",
            children: [{
                    path: '',
                    name: 'main',
                    component: () =>
                        import ("./views/admin/views/teaching/Teaching.vue"),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'setting',
                    component: () =>
                        import ("./views/admin/views/setting/")
                }, , {
                    // 教学安排
                    path: 'teaching',
                    name: 'teaching',
                    children: [{
                        path: 'show-teach',
                        name: 'show-teach',
                        component: () =>
                            import ("./views/admin/views/teaching/Teaching.vue")
                    }, {
                        path: 'add-teach',
                        name: 'add-teach',
                        component: () =>
                            import ("./views/admin/views/teaching/AddTeach.vue")
                    }, {
                        path: 'modify-teach',
                        name: 'modify-teach',
                        component: () =>
                            import ("./views/admin/views/teaching/ModifyTeach.vue")
                    }],
                    component: () =>
                        import ("./views/admin/views/teaching/Index.vue")
                },

                {
                    // 学生成绩
                    path: 'results',
                    name: 'results',
                    children: [{
                            path: 'add-result',
                            name: 'add-result',
                            component: () =>
                                import ("./views/admin/views/results/AddResult.vue")
                        }, {
                            path: 'student-result',
                            name: 'student-result',
                            component: () =>
                                import ("./views/admin/views/results/StudentResult.vue")
                        },
                        {
                            path: 'student-result-chart',
                            name: 'student-result-chart',
                            component: () =>
                                import ("./views/admin/views/results/ResultChart.vue")

                        }
                    ],
                    component: () =>
                        import ("./views/admin/views/results/Index.vue")
                },

                {
                    // 学生档案
                    path: 'files',
                    name: 'files',
                    children: [{
                        path: 'add-file',
                        name: 'add-file',
                        component: () =>
                            import ("./views/admin/views/files/AddFile.vue")
                    }, {
                        path: 'student-file',
                        name: 'student-file',
                        component: () =>
                            import ("./views/admin/views/files/StudentFile.vue")
                    }],
                    component: () =>
                        import ("./views/admin/views/files/Index.vue")
                },

                {
                    // 考试安排
                    path: 'exam',
                    name: 'exam',
                    children: [{
                        path: 'add-exam',
                        name: 'add-exam',
                        component: () =>
                            import ("./views/admin/views/examination/AddExamination.vue")
                    }, {
                        path: 'student-exam',
                        name: 'student-exam',
                        component: () =>
                            import ("./views/admin/views/examination/Examination.vue")
                    }],
                    component: () =>
                        import ("./views/admin/views/examination/Index.vue")
                }
            ],
            component: () =>
                import ("./views/admin/Layout.vue")
        },
        {
            path: "*",
            name: "NOT FOUND",
            component: () =>
                import ("./views/404.vue")
        },
    ]
});