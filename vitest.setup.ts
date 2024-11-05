/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { server } from "./src/mocks/server";
import { beforeAll, afterAll, beforeEach } from "vitest";

beforeAll(() => {
    server.listen()
})

afterAll(() => {
    server.close()
})

beforeEach(() => {
    server.resetHandlers()
})

// 在测试设置文件中
// eslint-disable-next-line no-undef
process.on('unhandledRejection', (reason, promise) => {
    // 这里可以添加条件来过滤特定的未处理拒绝
    if (reason instanceof Error && reason.name === 'AbortError') {
        return; // 忽略特定的未处理拒绝
    }

    // 对于其他未处理拒绝，您可以选择抛出错误或记录
    throw new Error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});