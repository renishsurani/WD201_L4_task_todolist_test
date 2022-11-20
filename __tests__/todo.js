/* eslint-disable no-undef */
const TodaysList = require('../todo');

const { all, markAsComplete, add, overdue, dueToday, dueLater } = TodaysList();

describe("Todolist Test Suite", () => {
    beforeAll(() => {
        const todayTime = new Date();
        const oneDayTime = 60 * 60 * 24 * 1000;
        [
            {
                title: "Read Book",
                completed: false,
                dueDate: new Date(todayTime.getTime() - 2 * oneDayTime).toLocaleDateString("en-CA"),
            },
            {
                title: "Watch TV",
                completed: false,
                dueDate: new Date().toLocaleDateString("en-CA"),
            },
            {
                title: "Order Clothes",
                completed: false,
                dueDate: new Date(todayTime.getTime() + 2 * oneDayTime).toLocaleDateString("en-CA"),
            }
            ,
            {
                title: "Buy new pen",
                completed: false,
                dueDate: new Date(todayTime.getTime() + 4 * oneDayTime).toLocaleDateString("en-CA"),
            }
        ].forEach(add);
    })
    test("Should add a new todo", () => {
        expect(all.length).toBe(4);
        add({
            title : "New Task",
            completed: false,
            dueDate: new Date().toLocaleDateString("en-CA")
        });
        expect(all.length).toEqual(5);
    });
    
    test("should mark a todo as complete", () => {
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    });

    test("Item retrieval of overDue", () => {
        expect(overdue().length).toEqual(1);
    });
    test("Item retrieval of today", () => {
        expect(dueToday().length).toEqual(2);
    });
    test("Item retrieval of overLater", () => {
        expect(dueLater().length).toEqual(2);
    });
})