export function updateRepositoryURLs(theme) {
    const repositories = document.querySelectorAll(".repository");
    repositories.forEach((repository) => {
        const url = new URL(repository.src);
        url.searchParams.set("theme", theme);
        repository.src = url.toString();
    });
}

