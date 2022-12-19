
exports.generateTextMajor = (major) => {
  switch (major) {
    case 'cpe':
      major = 'วิศวกรรมคอมพิวเตอร์'
      break
    default:
      major = ''
      break
  }
  return major
}
