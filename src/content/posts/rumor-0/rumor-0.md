---
draft: true
title: 'Forge村民间对话小模组（零）：新建文件夹（）'
tags: 
  - Minecraft
  - Forge
  - Java
  - 游戏
abbrlink: rumor-0
published: 2025-12-20
lang: zh
---

```java
public void gossip(ServerLevel pServerLevel, Villager pTarget, long pGameTime) {
      if ((pGameTime < this.lastGossipTime || pGameTime >= this.lastGossipTime + 1200L) && (pGameTime < pTarget.lastGossipTime || pGameTime >= pTarget.lastGossipTime + 1200L)) {
         this.gossips.transferFrom(pTarget.gossips, this.random, 10);
         this.lastGossipTime = pGameTime;
         pTarget.lastGossipTime = pGameTime;
         this.spawnGolemIfNeeded(pServerLevel, pGameTime, 5);
      }
}
```

```java
    @Override
    protected boolean checkExtraStartConditions(@NotNull ServerLevel pLevel, @NotNull Villager pOwner) {

        // 如果有聊天对象，就继续
        if (pOwner.getBrain().hasMemoryValue(RumorMemoryTypes.CHAT_TARGET.get())) {
            return true;
        }

        // 如果正在搜寻，就找一个
        if (pOwner.getBrain().isMemoryValue(RumorMemoryTypes.CHAT_STATUS.get(), ChatStatus.SEARCHING)) {
            Optional<Villager> target = findChatTarget(pLevel, pOwner);

            if (target.isPresent()) {

                Villager targetVillager = target.get();

                // 设置己方的聊天状态和对象
                pOwner.getBrain().setMemory(RumorMemoryTypes.CHAT_STATUS.get(), ChatStatus.APPROACHING);
                pOwner.getBrain().setMemory(RumorMemoryTypes.CHAT_TARGET.get(), targetVillager);
                pOwner.getBrain().setMemory(RumorMemoryTypes.IS_CHAT_LEADER.get(), true);

                // 设置对方的聊天状态和对象
                targetVillager.getBrain().setMemory(RumorMemoryTypes.CHAT_STATUS.get(), ChatStatus.APPROACHING);
                targetVillager.getBrain().setMemory(RumorMemoryTypes.CHAT_TARGET.get(), pOwner);

                return true;
            }
        }

        // 冷却检查
        if (pOwner.getBrain().isMemoryValue(RumorMemoryTypes.CHAT_STATUS.get(),ChatStatus.COOLDOWN)) {
            Optional<Long> lastChatTimeOpt = pOwner.getBrain().getMemory(RumorMemoryTypes.LAST_CHAT_TIME.get());
            if (lastChatTimeOpt.isPresent()) {
                long lastChatTime = lastChatTimeOpt.get();
                long currentTime = pLevel.getGameTime();
                if (currentTime - lastChatTime >= COOLDOWN_DURATION) {
                    // 冷却时间足够，状态更新为搜寻
                    pOwner.getBrain().setMemory(RumorMemoryTypes.CHAT_STATUS.get(), ChatStatus.SEARCHING);
                }
            }
        } else {
            // 如果既不是在靠近，聊天也不是在搜寻或冷却，就直接设置为搜寻
            pOwner.getBrain().setMemory(RumorMemoryTypes.CHAT_STATUS.get(), ChatStatus.SEARCHING);
        }

        // 其他未知状态返回false
        return false;
    }
```
