import UUID from 'uuid-js'

//生成uuid
export function generateUUID() {
  return UUID.create().toString()
}