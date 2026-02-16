<script setup lang="ts">
import ButtonBase from './components/ButtonBase.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import CardBase from './components/v-card/CardBase.vue'
import CardContent from './components/v-card/CardContent.vue'
import CardDescription from './components/v-card/CardDescription.vue'
import CardFooter from './components/v-card/CardFooter.vue'
import CardHeader from './components/v-card/CardHeader.vue'
import CardTitle from './components/v-card/CardTitle.vue'
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
</style>
