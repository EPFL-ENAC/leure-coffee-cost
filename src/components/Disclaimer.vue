<template>
  <div class="disclaimer-footer">
    <h2>Disclaimer</h2>
    <p>
      <strong
        >LEUrE (Laboratory of Environmental and Urban Economics, EPFL)</strong
      >
      developed this application as part of the research project
      <em
        >‘From Farm to Fork and beyond: A Systemic Approach for Implementing
        True Cost Accounting for Food in Switzerland’</em
      >, funded by the
      <strong>Swiss National Science Foundation (SNSF)</strong>, from 2024 to
      2027 (project number: 216652).
    </p>
    <p>
      It was developed as part of a partnership that consists of:
      <strong>LEUrE (EPFL)</strong>,
      <strong>RESCO (EPFL restaurants, shops, hotels)</strong>,
      <strong>ENAC-IT-4-Research (EPFL)</strong>, with contributions from the
      <strong>Compass Group</strong> and <strong>Dallmayr</strong>.
    </p>
    <p>
      The results of this application are based on the data, scope, and
      limitations as presented and documented in the application on sources
      considered reliable. <strong>No warranty</strong>
      is given as to the accuracy, precision, or completeness, whether express
      or implied, due to the nature of the data. Neither the partners nor any of
      the companies shall be liable for any loss or damage arising from the use
      of the application or the information presented therein.
    </p>
  </div>
</template>
<style scoped>
.disclaimer-footer {
  padding: 2em 0;
  font-size: 0.95em;
  line-height: 1.6;
  text-align: justify;
}

.disclaimer-footer p {
  margin-bottom: 1.5em;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.disclaimer-footer strong {
  font-weight: bold;
}

.disclaimer-footer em {
  font-style: italic;
}

@media screen and (max-width: 600px) {
  .disclaimer-footer {
    padding: 1.5em 1em;
    font-size: 0.9em;
  }
}
</style>
