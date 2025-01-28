<template>
  <div class="disclaimer-footer">
    <h2>Contact</h2>
    <div id="project-info" class="project-info">
      <p>
        For any questions or feedback,
        <a href="mailto:gino.baudry@epfl.ch">please write us !</a>
      </p>
    </div>
    <h2>Disclaimer</h2>
    <div id="project-info" class="project-info">
      <p>
        This application is part of a bigger project called
        <a
          href="https://truecostoffood.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          True Cost of Food </a
        >, aiming to raise awareness about the hidden costs of food production
        and consumption.
      </p>
    </div>
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
a {
  color: var(--color-primary);
  font-weight: bold;
  text-decoration: dotted white underline;
}
@media screen and (max-width: 600px) {
  .disclaimer-footer {
    font-size: 0.9em;
  }
}
</style>
