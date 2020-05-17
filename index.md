---
layout: default
title: Home
description: Home page of Julian Jupiter.
keywords: Blog, GitHub, Programming, Java, Linux, Web
---

<section class="jumbotron text-center rounded-0 mb-0">
    <div class="container">
        <h1>{{ site.title }}</h1>
        <p class="lead text-muted">{{ site.description }}</p>
        <p>
        <a href="/blog" class="btn btn-primary my-2" style="min-width: 100px;">Blog</a>
        <a href="/projects" class="btn btn-secondary my-2" style="min-width: 100px;">Projects</a>
        </p>
    </div>
</section>
<section class="py-5 bg-white">
    <div class="container">
        <div class="row">
            {% for post in site.posts limit:6 %}
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                    <div class="card-body" style="min-height: 250px;">
                        <h5 class="card-title"><a href="{{ post.url | prepend: site.url }}" title="{{ post.description }}">{{ post.title }}</a></h5>
                        <p><info datetime="{{ post.date | date: " %Y-%m-%d " }}">{{ post.date | date: "%B %-d, %Y" }}</info></p>
                        <p class="card-text">{{ post.description }}</p>
                    </div>
                </div>
            </div>
            {% endfor %}
        </div>
        {% if site.posts.size > 6 %}
        <div class="row">
            <div class="col text-center">
                <a href="/blog" class="btn btn-primary btn-lg my-2" style="min-width: 100px;">More Blogs...</a>
            </div>
        </div>
        {% endif %}
    </div>
</section>