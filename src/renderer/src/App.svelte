<script>
// @ts-nocheck

  import { mainTodoActive, doneTodoActive, starsTodoActive, secretTodoActive, todos, optionsActive } from './store/stores'
  import Sidebar from './components/sidebar/Sidebar.svelte'
  import TodoList from './components/sidebar/routes/TodoList.svelte'
  import DoneList from './components/sidebar/routes/DoneList.svelte'
  import StarsList from './components/sidebar/routes/StarsList.svelte'
  import SecretList from './components/sidebar/routes/SecretList.svelte'
  import Options from './components/sidebar/routes/Options.svelte'
  import { onMount } from 'svelte'

  onMount(async () => {
    const savedTodos = await window.api.loadTodos();
    await window.api.system()
    todos.set(savedTodos);
  })
  $: navigator.setAppBadge($todos.length)
</script>

<div class="container">
  <Sidebar />
  {#if $mainTodoActive}
    <TodoList />
  {:else if $doneTodoActive}
    <DoneList />
  {:else if $starsTodoActive}
    <StarsList />
  {:else if $secretTodoActive}
    <SecretList />
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
  }
</style>