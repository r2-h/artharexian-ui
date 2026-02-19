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
import InputBase from './components/input-base/InputBase.vue'
import RangeBase from './components/range-base/RangeBase.vue'
import TabsBase from './components/tabs/TabsBase.vue'
import TabsList from './components/tabs/TabsList.vue'
import TabsPanel from './components/tabs/TabsPanel.vue'
import TabsTab from './components/tabs/TabsTab.vue'
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
          <CardFooter> <RangeBase variant="secondary" /></CardFooter>
        </CardBase>
      </div>
  
      <div style="margin: 2.4rem">
        <CardBase>
          <CardHeader>
            <TabsBase>
              <TabsList>
                <TabsTab value="overview">Overview</TabsTab>
                <TabsTab value="user">User</TabsTab>
              </TabsList>
              <TabsPanel value="overview">
                <h1>This is Overview</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </TabsPanel>
              <TabsPanel value="user">
                <h1>This is User</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero consectetur ipsam
                  esse ullam veniam facilis vitae ipsa ducimus recusandae .
                </p>
              </TabsPanel>
            </TabsBase>
          </CardHeader>
          <CardContent>
            <div style="display: flex; gap: 1.5rem">
              <!--  15 45 75 -->
              <RangeBase
                isVertical
                :has-thumb="false"
                :vars="{ progress: { width: '2rem' } }"
                :model-value="25"
              />
              <RangeBase
                isVertical
                :has-thumb="false"
                :vars="{ progress: { width: '2rem' } }"
                :model-value="50"
              />
              <RangeBase
                isVertical
                :has-thumb="false"
                :vars="{ progress: { width: '2rem' } }"
                :model-value="75"
              />
            </div>
            <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-top: 2rem">
              <RangeBase :model-value="25" :has-thumb="false" />
              <RangeBase :model-value="50" :has-thumb="false" />
            </div>
          </CardContent>
          <CardFooter><InputBase placeholder="placeholder" /></CardFooter>
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
  vertical-align: middle;
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
