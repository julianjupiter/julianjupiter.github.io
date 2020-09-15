---
layout: default
title: Blog
description: Blog page of Julian Jupiter.
keywords: Blog, GitHub, Programming, Java, Linux, Web
---

<section class="jumbotron text-center rounded-0">
    <div class="container">
        <h1>Blog</h1>
    </div>
</section>
<section class="album py-5 bg-white">
    <div class="container">
        <div class="row">
            {% for post in site.posts %}
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <img class="rounded-top" src="{{ post.image.thumbnail | prepend: site.url }}">
                    <div class="card-body" style="min-height: 250px;">
                        <h5 class="card-title"><a href="{{ post.url | prepend: site.url }}" title="{{ post.description }}">{{ post.title }}</a></h5>
                        <p>
                            <info datetime="{{ post.date | date: " %Y-%m-%d " }}">{{ post.date | date: "%B %-d, %Y" }}</info> &#124;
                            <a href="{{ post.url | prepend: site.url }}#disqus_thread" data-disqus-identifier="{{ post.url }}"></a>
                        </p>
                        <p class="card-text">{{ post.description }}</p>
                    </div>
                </div>
            </div>
            {% endfor %}
        </div>
    </div>
</section>