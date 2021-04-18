---
layout: default
title: Projects
description: Projects page of Julian Jupiter.
keywords: Blog, GitHub, Programming, Java, Linux, Web
---

<section class="jumbotron text-center rounded-0">
    <div class="container">
        <h1>Projects</h1>
    </div>
</section>
<section class="album py-5 bg-white">
    <div class="container">
        <div class="row">
            {% for project in site.projects %}
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                    <div class="card-body" style="min-height: 250px;">
                        <h5 class="card-title"><a href="{{ project.website }}" title="{{ project.description }}">{{ project.title }}</a></h5>
                        <p class="card-text">{{ project.description }}</p>
                    </div>
                </div>
            </div>
            {% endfor %}
        </div>
    </div>
</section>