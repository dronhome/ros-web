<script>
  import { afterNavigate } from '$app/navigation';
  import { tick } from 'svelte';

  export let content = [];

  let questions = content.questions;
  let answers = questions.map(() => null);
  let submitted = false;
  let score = 0;
  let scrollableContainer;  

  function submitQuiz() {
      score = 0;
      questions.forEach((q, i) => {
          const user = answers[i];
          if (q.type === 'short') {
              if (user?.trim().toLowerCase() === q.answer.trim().toLowerCase()) {
                  score += 1;
              }
          } else {
              if (user === q.answer) {
                  score += 1;
              }
          }
      });
      submitted = true;
      console.log('Quiz submitted:', { submitted, answers, score });
  }
  async function try_again() {
    score = 0;
    answers = questions.map(() => null);
    submitted = false;
    await tick();
    if (scrollableContainer) {
        scrollableContainer.scrollTop = 0;
    }
  }
</script>

<section class="tests" bind:this={scrollableContainer}>
  <div class="on_questions">
    <h1>{content.title}</h1>
  </div>

  {#each questions as q, i}
      <div class="test-block">
          <h3 class="test-question">Otázka {i + 1}</h3>
          <p class="question-text">{q.question}</p>

          {#if q.type === 'mcq' && q.options}
              <ul class="options-list">
                  {#each q.options as opt}
                      <li>
                          <label class:correct={submitted && opt === q.answer}
                                  class:incorrect={submitted && answers[i] === opt && opt !== q.answer}>
                              <input type="radio"
                                      name="q-{i}"
                                      bind:group={answers[i]}
                                      disabled={submitted}
                                      value={opt} />
                              <span class="option-text">{opt}</span>
                          </label>
                      </li>
                  {/each}
              </ul>

          {:else if q.type === 'truefalse'}
              <ul class="options-list">
                  {#each ['True', 'False'] as val}
                      <li>
                          <label class:correct={submitted && val === q.answer}
                              class:incorrect={submitted && answers[i] === val && val !== q.answer}>
                              <input type="radio"
                                      name="q-{i}"
                                      bind:group={answers[i]}
                                      disabled={submitted}
                                      value={val} />
                              <span class="option-text">{val}</span>
                          </label>
                      </li>
                  {/each}
              </ul>

          {:else if q.type === 'short'}
              <input class="short-answer"
                      class:correct={submitted && answers[i]?.trim().toLowerCase() === q.answer.trim().toLowerCase()}
                      class:incorrect={submitted && answers[i] && answers[i].trim().toLowerCase() !== q.answer.trim().toLowerCase()}
                      type="text"
                      placeholder="Vaša odpoveď"
                      disabled={submitted}
                      bind:value={answers[i]} />
          {/if}
      </div>
  {/each}

  <div class="buttons">
    <button class="submit-btn" on:click={submitQuiz} disabled={submitted}>Vyhodnoť test</button>
    <button class="try-again-btn" on:click={try_again} hidden={!submitted}>Skús znova</button>
  </div>

  {#if submitted}
      <p class="score">Výsledok: {score} / {questions.length}</p>
  {/if}
</section>

<style>
  :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background: #1f1f1f;
        color: #ddd;
    }
    .tests {
        padding-top: 1vh;
        padding-left: 10%;
        padding-right: 10%;
        padding-bottom: 5%;
        background-color: #2f2f2f;
        border-left: 0.01px solid rgba(128, 128, 128, 0.479);
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        overflow-y: auto;
    }
    h1, h2 {
        font-weight: 600;
        letter-spacing: 0.5px;
        margin-bottom: 1rem;
        color: #fff;
    }
    h1 {
        font-size: 2rem;
        margin-bottom: 1.5rem;
    }
    .on_questions {
      margin-bottom: 3rem;
    }

  .test-block { margin-bottom: 1.5rem; padding: 1rem 1.5rem; border: 1px solid #444; border-radius: 8px; background-color: #3a3a3a; }
  .test-question { margin: 0 0 0.5rem; font-size: 1.2rem; color: #9fe2ff; }
  .question-text { margin-bottom: 0.75rem; color: #ddd; }
  .options-list { list-style: none; padding: 0; margin: 0; }
  .options-list li { margin-bottom: 0.6rem; }
  .options-list label { display: flex; align-items: center; cursor: pointer; }
  .options-list input[type="radio"] { margin-right: 0.75rem; width: 1.1em; height: 1.1em; }
  .option-text { font-size: 1rem; color: #e8e8e8; }
  .short-answer { width: 100%; padding: 0.6rem 0.8rem; border: 1px solid #6ec6ff; border-radius: 6px; background-color: #2f2f2f; color: #fff; font-size: 1rem; box-sizing: border-box; }
  .short-answer::placeholder { color: #888; }
  .submit-btn { margin-top: 1rem; padding: 0.6rem 1.2rem; background: #6ec6ff; color: #1f1f1f; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer; }
  .submit-btn[disabled] { opacity: 0.5; cursor: default; }
  .try-again-btn { margin-top: 1rem; padding: 0.6rem 1.2rem; background: #5ce060; color: #1f1f1f; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer; }
  .score { margin-top: 1rem; font-size: 1.1rem; font-weight: 600; color: #9fe2ff; }
  .correct { background-color: rgba(76, 175, 80, 0.1); }
  .incorrect { background-color: rgba(244, 67, 54, 0.1); }
  .correct { color: #4caf50 !important; }
  .incorrect { color: #f44336 !important; }
</style>
