declare global {
  namespace NodeJS {
    interface Global {
      // eslint-disable-next-line @typescript-eslint/ban-types
      Config: {};
    }
  }
}
export default global;
