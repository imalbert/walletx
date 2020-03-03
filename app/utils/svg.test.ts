import {
  toSvgPolylinePts,
  toSvgTSpanPts,
} from './svg'

const containerWidth = 200
const containerHeigh = 90
const data = [
  { day: '1', total: 100 },
  { day: '2', total: 300 },
  { day: '3', total: 200 },
]

test('svg polyline pts', () => {
  const svgPts = toSvgPolylinePts({
    data,
    width: containerWidth,
    height: containerHeigh,
    topData: 300,
  })
  expect(svgPts).toBe("0,60 100,0 200,30")
})

test('svg polyline pts + padding', () => {
  const svgPts = toSvgPolylinePts({
    data,
    width: containerWidth,
    height: containerHeigh,
    topData: 300,
    paddingX: 20,
    paddingY: 20,
  })
  expect(svgPts).toBe("20,53 100,20 180,36")
})

test('svg tspan pts', () => {
  const svgPts = toSvgTSpanPts({ data, width: containerWidth, height: containerHeigh })
  expect(svgPts).toStrictEqual({
    x: ['0', '66', '132'],
    y: ['30', '60', '90'],
    deltaX: 66,
    deltaY: 30,
  })
})

test('svg tspan pts + offset', () => {
  const svgPts = toSvgTSpanPts({
    data,
    width: containerWidth,
    height: containerHeigh,
    offsetX: 10,
    offsetY: -10,
  })
  expect(svgPts).toStrictEqual({
    x: ['10', '76', '142'],
    y: ['20', '50', '80'],
    deltaX: 66,
    deltaY: 30,
  })
})