export const toSvgPolylinePts = ({
  data,
  width,
  height,
  topData,
  paddingX = 0,
  paddingY = 0,
}) => {
  const paddedWidth = width - paddingX*2
  const paddedHeight = height - paddingY*2
  const widthMult = paddedWidth/(data.length-1)
  const heightMult = (paddedHeight/topData)

  return data
    .reduce((points, item, index) => {
      const xPt = Math.floor(index*widthMult) + paddingX
      const yPt = Math.floor(height-(item.total*heightMult)) - paddingY
      return `${points}${xPt},${yPt} `
    }, '')
    .trimEnd()
}

interface dataPts {
  data: any,
  width: number,
  height: number,
  offsetX?: number,
  offsetY?: number,
}
export const toSvgTSpanPts = ({
  data,
  width,
  height,
  offsetX = 0,
  offsetY = 0,
}: dataPts) => {
  const widthMult = Math.floor(width/(data.length))
  const heightMult = Math.floor(height/data.length)

  return data.reduce((axis, item, index) => {
    axis.x.push((((index*widthMult) + offsetX)).toString())
    axis.y.push((((index+1)*heightMult) + offsetY).toString())

    return axis
  }, { x: [], y: [], deltaX: widthMult, deltaY: heightMult })
}