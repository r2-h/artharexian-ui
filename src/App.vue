<script setup lang="ts">
import ButtonBase from './components/ButtonBase.vue'
import CheckboxBase from './components/CheckboxBase.vue'
import SwitchBase from './components/SwitchBase.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import CardBase from './components/card-base/CardBase.vue'
import CardContent from './components/card-base/CardContent.vue'
import CardDescription from './components/card-base/CardDescription.vue'
import CardFooter from './components/card-base/CardFooter.vue'
import CardHeader from './components/card-base/CardHeader.vue'
import CardTitle from './components/card-base/CardTitle.vue'
import RangeBase from './components/range-base/RangeBase.vue'
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>UI Library Demo</h1>
      <ThemeToggle />
    </header>
    <main>
      <div class="wrapper">
        <ButtonBase variant="danger" />
        <ButtonBase variant="primary" />
        <ButtonBase disabled />
        <ButtonBase />
        <SwitchBase />
        <CheckboxBase />
        <RangeBase :vars="{ progress: { height: '0.1rem' } }" />
        <RangeBase :show-thumb="false" />
      </div>

      <div style="margin: 2.4rem">
        <CardBase>
          <CardHeader>
            <CardTitle>This is my title</CardTitle>
            <CardDescription>This is a price of my product</CardDescription>
          </CardHeader>
          <CardContent as="ul">
            <li>This is one benefit</li>
            <li>This is one benefit</li>
            <li>This is one benefit</li>
          </CardContent>
          <CardFooter><ButtonBase>Purchase now</ButtonBase></CardFooter>
        </CardBase>
      </div>
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.app-container {
  padding: 20px;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

:deep(.thumbb) {
  background: red;
}
</style>
