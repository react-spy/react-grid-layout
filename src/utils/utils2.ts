import type { Item } from "@/typing/index";

/**
 * 考虑右侧填充，有时候还是有些问题；后续再优化吧
 * @param layout
 * @param width
 * @param height
 * @param totalWidth
 * @returns
 */
export const getAvailablePosition = (
  layout: Item[],
  width: number,
  height: number,
  totalWidth: number
) => {
  const usedPositions = new Set();
  layout.forEach((item) => {
    for (let x = item.x; x < item.x + item.w; x++) {
      for (let y = item.y; y < item.y + item.h; y++) {
        usedPositions.add(`${x},${y}`);
      }
    }
  });
  for (let y = 0, count = 0; y < height; y++, count = 0) {
    for (let x = 0; x < totalWidth; x++) {
      if (usedPositions.has(`${x},${y}`)) {
        // 该位置已被使用，重置 count
        count = 0;
        continue;
      }

      // 该位置未被使用，累加 count
      count += width;

      // 如果该行已经没有足够空间放置该卡片，跳到下一行
      if (count >= totalWidth) {
        break;
      }

      // 如果该位置可以放置该卡片，返回该位置
      if (x + width <= totalWidth && y + height <= height) {
        return { x, y };
      }
    }
  }

  // 如果没有足够空间放置该卡片，返回 null
  return null;
};

export const insertCard = (
  layout: Item[],
  newCard: Item,
  totalWidth: number = 4
) => {
  const { w, h } = newCard;
  const availablePosition = getAvailablePosition(layout, w, h, totalWidth);

  if (!availablePosition) {
    // 如果没有可用位置，将卡片添加到布局的底部
    const lastCard = layout[layout.length - 1];
    if (lastCard.x + lastCard.w === totalWidth) {
      // 如果最后一张卡片的右侧紧贴总宽度，则新卡片需放在下一行
      newCard.x = 0;
      newCard.y = lastCard.y + lastCard.h;
    } else {
      // 否则新卡片需放在当前行，且尽量靠右侧放置
      newCard.x = lastCard.x + lastCard.w;
      newCard.y = lastCard.y;
    }
  } else {
    // 如果有可用位置，将卡片添加到可用位置的顶部
    newCard.x = availablePosition.x;
    newCard.y = availablePosition.y;
  }

  layout.push(newCard);
  return layout;
};
