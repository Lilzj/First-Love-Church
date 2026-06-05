using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace FirstLoveChurch.API.Helpers;

public static class SlugHelper
{
    public static string GenerateSlug(string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            return string.Empty;

        // Remove diacritics
        var normalizedString = text.Normalize(NormalizationForm.FormD);
        var stringBuilder = new System.Text.StringBuilder();

        foreach (var c in normalizedString)
        {
            var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
            if (unicodeCategory != UnicodeCategory.NonSpacingMark)
                stringBuilder.Append(c);
        }

        var slug = stringBuilder.ToString().Normalize(NormalizationForm.FormC);

        // Convert to lowercase
        slug = slug.ToLowerInvariant();

        // Replace spaces with hyphens
        slug = Regex.Replace(slug, @"\s+", "-");

        // Remove invalid characters
        slug = Regex.Replace(slug, @"[^a-z0-9\-]", "");

        // Remove multiple hyphens
        slug = Regex.Replace(slug, @"-{2,}", "-");

        // Trim hyphens from start and end
        slug = slug.Trim('-');

        return slug;
    }

    public static string GenerateUniqueSlug(string text, Func<string, bool> slugExists)
    {
        var baseSlug = GenerateSlug(text);
        var slug = baseSlug;
        var counter = 1;

        while (slugExists(slug))
        {
            slug = $"{baseSlug}-{counter}";
            counter++;
        }

        return slug;
    }
}
