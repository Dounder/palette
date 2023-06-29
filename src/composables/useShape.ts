import { ref } from 'vue'
import type { Shape } from './../interfaces/shapes.interface'

const colors = ['#A1DED0', '#FFE8FF', '#D3A6E9', '#C2F195', '#FFD874']

const useShape = () => {
  const shapes = ref<Shape[]>([])

  const getRandomNumber = (min: number = 5, max: number = 5): number =>
    Math.floor(Math.random() * (max - min + 1) + min)

  // Check if the shape is in the center of the container
  const checkOverlap = (shape1: Shape, shape2: Shape): any => {
    const shape1Rect = getShapeRect(shape1)
    const shape2Rect = getShapeRect(shape2)

    return (
      shape1Rect.bottom >= shape2Rect.top &&
      shape1Rect.top <= shape2Rect.bottom &&
      shape1Rect.right >= shape2Rect.left &&
      shape1Rect.left <= shape2Rect.right
    )
  }

  const getShapeRect = (shape: Shape) => ({
    top: shape.top,
    left: shape.left,
    bottom: shape.top + shape.height,
    right: shape.left + shape.width
  })

  const generateShapes = (container: HTMLElement, quantity: number = 10) => {
    for (let i = 0; i < quantity; i++) {
      const width = getRandomNumber(150, 300)
      const height = getRandomNumber(150, 300)

      const shape: Shape = {
        width,
        height,
        left: getRandomNumber(0, container.clientWidth - width),
        top: getRandomNumber(0, container.clientHeight - height),
        color: colors[getRandomNumber(0, colors.length - 1)]
      }

      shapes.value.push(shape)
    }
  }

  return {
    //* Props
    shapes,

    //? Methods
    changePosition: (container: HTMLElement, title: HTMLElement, quantity = 10) => {
      const titleRect = title.getBoundingClientRect() // Get the title's bounding rectangle
      // Create a shape object for the title
      const titleShape: Shape = {
        width: titleRect.width + 100,
        height: titleRect.height + 100,
        left: titleRect.left - 50,
        top: titleRect.top - 50,
        color: 'red'
      }

      if (shapes.value.length === 0) generateShapes(container, quantity)

      // Randomize the position of the shapes
      shapes.value = shapes.value.map((shape) => ({
        ...shape,
        left: getRandomNumber(0, container.clientWidth - shape.width),
        top: getRandomNumber(0, container.clientHeight - shape.height)
      }))

      // Check if the title overlaps with any of the shapes
      for (let i = 0; i < shapes.value.length; i++) {
        const shape: Shape = shapes.value[i]

        // If the title overlaps with a shape, change the shape's position
        while (checkOverlap(shapes.value[i], titleShape)) {
          shape.left = getRandomNumber(0, container.clientWidth - shape.width)
          shape.top = getRandomNumber(0, container.clientHeight - shape.height)
        }

        for (let j = 0; j < shapes.value.length; j++) {
          if (i !== j && checkOverlap(shape, shapes.value[j])) {
            shape.left = getRandomNumber(0, container.clientWidth - shape.width)
            shape.top = getRandomNumber(0, container.clientHeight - shape.height)

            // Restart the loop to recheck the position with all other shapes
            i = -1
            break
          }
        }
      }
    }
  }
}

export default useShape
