<script>
// @ts-nocheck

  import { mainTodoActive, doneTodoActive, starsTodoActive } from './store/stores'
  import Sidebar from './components/sidebar/Sidebar.svelte'
  import TodoList from './components/sidebar/routes/TodoList.svelte'
  import DoneList from './components/sidebar/routes/DoneList.svelte'
  import StarsList from './components/sidebar/routes/StarsList.svelte'
</script>

<div class="container">
  <Sidebar />
  {#if $mainTodoActive}
    <TodoList />
  {:else if $doneTodoActive}
    <DoneList />
  {:else if $starsTodoActive}
    <StarsList />
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
  }
</style>