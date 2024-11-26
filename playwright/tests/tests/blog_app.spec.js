const { test, expect, beforeEach, describe } = require('@playwright/test')
const { userLogin, createBlog } = require('./test_helper')
describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http:localhost:5173/api/testing/reset')
        await request.post('http://localhost:5173/api/users', { data: users.firstUser })
        await request.post('http://localhost:5173/api/users', { data: users.secondUser })

        await page.goto('http://localhost:5173')
    })

    let newBlog = {
        title: 'Error on line 68, but I have 18 lines of code',
        author: 'Doggus Confusicus',
        url: 'moc.test.lru',
    }
    const users = {
        firstUser: {
            name: 'John Doe',
            username: 'tester',
            password: 'tester'
        },
        secondUser:
        {
            name: 'Din Joghe',
            username: 'testuster',
            password: 'testuster'
        }
    }

    test('Login form is shown', async ({ page }) => {
        await page.getByRole("button", { name: "Log in" }).click()

        await expect(page.getByTestId('username')).toBeVisible()
        await expect(page.getByTestId('password')).toBeVisible()
        await expect(page.getByTestId('buttonLogin')).toBeVisible()
        await expect(page.getByTestId('buttonCancel')).toBeVisible()
    })

    describe("Login", () => {
        test("fail with incorrect credentials", async ({ page }) => {
            await userLogin(page, "retset", "retset")
            await expect(page.getByTestId('notification')).toContainText("Invalid credentials")
        })


        test("succeed with correct credentials", async ({ page }) => {
            await userLogin(page, users.firstUser.username, users.firstUser.password)
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByTestId('greeting')).toContainText(users.firstUser.username)
            await expect(page.getByTestId('notification')).toContainText("Logged in as " + users.firstUser.username)
        })
    })

    describe("When logged in", () => {
        beforeEach(async ({ page }) => {
            await userLogin(page, users.firstUser.username, users.firstUser.password)

        })

        test("logged user can create a blog", async ({ page }) => {
            // flaky test. request reset doesn't always function properly and leaves in the test blog from previous runs.
            await createBlog(page, newBlog.title, newBlog.author, newBlog.url)

            await expect(page.getByTestId('notification')).toContainText("Succesfully created a blog")
            await expect(page.getByText(newBlog.title + " by " + newBlog.author)).toBeVisible()
        })

        test("logged user can add like to a blog", async ({ page }) => {
            await page.getByRole("button", { name: "View" }).nth(1).click()
            await page.getByRole("button", { name: "Like" }).click()

            await expect(page.getByTestId('notification')).toContainText("Added like to")
        })

        describe("When blog exists", () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, newBlog.title, newBlog.author, newBlog.url)
            })

            test("logged user can delete their blog", async ({ page }) => {
                page.on('dialog', async dialog => {
                    console.log(dialog.message())
                    await dialog.accept()
                })
                await page.getByText(newBlog.title)
                    .getByRole('button', { name: 'View' }).click()
                await page.getByRole('button', { name: 'Delete blog' }).click()

                await expect(page.getByTestId('notification')).toContainText("Blog titled " + newBlog.title + " was removed")
            })

            test("only blog poster can see delete button", async ({ page }) => {
                await page.getByRole('button', { name: 'Logout' }).click()
                await userLogin(page, users.secondUser.username, users.secondUser.password)

                await page.getByText(newBlog.title)
                    .getByRole('button', { name: 'View' }).click()

                await expect(page.getByRole('button', { name: 'Delete blog' })).not.toBeVisible()
            })

            test("blogs sorted by descending like order", async ({ page }) => {
                const rows = page.getByRole('button', { name: 'View' })
                const count = await rows.count();
                for (let i = 0; i < count; ++i) {
                    await rows.nth(i).click()
                }
                await expect(page.getByTestId("blogLikes").nth(0)).toContainText("7")
                await expect(page.getByTestId("blogLikes").nth(1)).toContainText("5")
                await expect(page.getByTestId("blogLikes").nth(2)).toContainText("0")
            })
        })
    })
})

