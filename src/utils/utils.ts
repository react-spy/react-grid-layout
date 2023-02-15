import type { Item } from "@/typing/index";

/**
 * 获取可用位置、将插入的卡片放置最下方
 * @param layout
 * @param width
 * @param height
 * @returns
 */
export const getAvailablePosition = (
  layout: Item[], // 已经存在的卡片数组
  width: number, // 新卡片的宽度
  height: number // 新卡片的高度
) => {
  // 记录已经被占用的位置
  const usedPositions = new Set();
  layout.forEach((item) => {
    // 遍历每个已存在的卡片
    for (let x = item.x; x < item.x + item.w; x++) {
      for (let y = item.y; y < item.y + item.h; y++) {
        usedPositions.add(`${x},${y}`); // 将该卡片所占的位置添加到已占用位置集合中
      }
    }
  });

  // 遍历布局的每一个可能位置
  for (let y = 0; y < height; y++) {
    let availableSpace = true; // 假设该行有可用位置
    for (let x = 0; x < width; x++) {
      if (usedPositions.has(`${x},${y}`)) {
        // 如果该位置已经被占用
        availableSpace = false; // 该行不可用
        break;
      }
      if (x + 1 < width && usedPositions.has(`${x + 1},${y}`)) {
        // 如果该位置后面的位置已经被占用
        availableSpace = false; // 该行不可用
        break;
      }
    }
    if (availableSpace) {
      // 如果该行有可用位置
      return { x: 0, y }; // 返回第一个位置
    }
  }

  return null; // 没有可用位置，返回 null
};

// 插入新卡片
export const insertCard = (layout: Item[], newCard: Item) => {
  const { w, h } = newCard;
  const availablePosition = getAvailablePosition(layout, w, h);

  if (!availablePosition) {
    // 如果没有可用位置
    const lastCard = layout[layout.length - 1]; // 获取最后一个卡片
    newCard.x = 0; // 将新卡片放置在第一列
    newCard.y = lastCard.y + lastCard.h; // 将新卡片放置在最后一个卡片的下方
  } else {
    // 如果有可用位置
    newCard.x = availablePosition.x; // 将新卡片放置在可用位置的最左边
    newCard.y = availablePosition.y; // 将新卡片放置在可用位置的最上面
  }

  layout.push(newCard); // 添加新卡片到布局中
  return layout; // 返回更新后的布局
};
