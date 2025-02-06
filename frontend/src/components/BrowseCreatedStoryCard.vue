<template>
    <div class="card h-100">
      <img :src="story.image" class="card-img-top" :alt="story.title" />
      <div class="card-body">
        <h5 class="card-title">{{ story.title }}</h5>
        <p class="card-text">{{ story.description }}</p>
        <p class="text-muted">Genere: {{ story.genre }}</p>
    
        <button class="btn btn-primary" @click="$emit('edit-details', story)">Modifica dettagli storia</button>
        <button class="btn btn-primary" @click="$emit('edit-content', story)">Modifica contenuti</button>
      </div>
    </div>

</template>
  
<script>
    import { defineComponent, ref } from 'vue';


    export default defineComponent({
      name: 'BrowseCreatedStoryCard',
  props: {
    story: {
      type: Object,
      required: true,
    },
  },
   
    });
</script>

<style scoped>
    .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
    .card-img-top {
    height: 200px;
    object-fit: cover;
    }
</style>
