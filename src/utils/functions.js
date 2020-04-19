import * as r from 'ramda'

const dbValueToArray = (value, sortBy = 'createdAt') => {
  const val = value.val()

  if (!val) {
    return []
  } else if (Array.isArray(val)) {
    return r.sort(r.ascend(r.prop(sortBy)), val)
  } else {
    return deindexByIdAndSort(val, sortBy)
  }
}

const deindexByIdAndSort = (val, column) => r.compose(
  r.sort(r.ascend(r.prop(column))),
  r.map(p => r.assoc('id', p, val[p])),
  r.keys,
)(val)

const slope = (A, B, a, b, val) => (val - A) * (b - a) / (B - A) + a

const layout2Nozzles = (layout, meter = .2) => {
  const moveAround = (centerX, centerY, startX, startY, angle) => {
    const a = angle * (Math.PI / 180)

    return {
      x: centerX + (startX - centerX) * Math.cos(a) - (startY - centerY) * Math.sin(a),
      y: centerY + (startY - centerY) * Math.cos(a) + (startX - centerX) * Math.sin(a),
    }
  }

  const grid = (props) => {
    const {
      centerX = 0, centerY = 0,
      rotateCenterX = 0, rotateCenterY = 0,
      width, height,
      angle = 0, spacing = 1,
    } = props

    let x, y
    const cx = centerX * meter * spacing
    const cy = centerY * meter * spacing
    const rx = rotateCenterX * meter * spacing
    const ry = rotateCenterY * meter * spacing

    return r.times((index) => {
      y = Math.floor(index / width)
      x = index - y * width

      const pos = moveAround(rx - cx, ry - cy,
        spacing * meter * (x - (width - 1) * 0.5),
        spacing * meter * (y - (height - 1) * 0.5),
        angle)

      return {
        x: pos.x + cx,
        y: pos.y + cy,
      }
    }, width * height)
  }

  const arc = ({ centerX = 0, centerY = 0, radius, count, startAngle = 0, endAngle = 360 }) => {
    return r.times((index) => {
      return moveAround(centerX, centerY, 0, radius * meter,
        slope(0, count, startAngle, endAngle, index))
    }, count)
  }

  return r.pipe(r.map((config) => {
    switch (config.type) {
      case 'grid':
        return grid(config)
      case 'arc':
        return arc(config)
      default:
        return []
    }
  }), r.flatten)(layout)
}

export {
  deindexByIdAndSort, dbValueToArray, layout2Nozzles, slope,
}
