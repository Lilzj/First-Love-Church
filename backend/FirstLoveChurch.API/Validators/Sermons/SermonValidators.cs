using FirstLoveChurch.API.DTOs.Sermons;
using FluentValidation;

namespace FirstLoveChurch.API.Validators.Sermons;

public class CreateSermonDtoValidator : AbstractValidator<CreateSermonDto>
{
    public CreateSermonDtoValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(500);
        RuleFor(x => x.VideoUrl).MaximumLength(1000);
        RuleFor(x => x.AudioUrl).MaximumLength(1000);
    }
}

public class CreateSermonCategoryDtoValidator : AbstractValidator<CreateSermonCategoryDto>
{
    public CreateSermonCategoryDtoValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
    }
}

public class CreateSermonTagDtoValidator : AbstractValidator<CreateSermonTagDto>
{
    public CreateSermonTagDtoValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);
    }
}

public class CreateSermonSeriesDtoValidator : AbstractValidator<CreateSermonSeriesDto>
{
    public CreateSermonSeriesDtoValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(500);
    }
}

public class CreateSermonCommentDtoValidator : AbstractValidator<CreateSermonCommentDto>
{
    public CreateSermonCommentDtoValidator()
    {
        RuleFor(x => x.Content).NotEmpty().MaximumLength(5000);
    }
}
